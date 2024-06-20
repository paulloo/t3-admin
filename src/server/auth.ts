import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import {jwtHelper} from '~/lib/jwtHelper'
import type { Provider } from "next-auth/providers/index";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


import { env } from "~/env";
import { db } from "~/server/db";
import { loginSchema } from "~/validation/auth";
import { DelFlagEnum, StatusEnum } from "~/lib/enum";
import { JWT } from "next-auth/jwt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * NextAuth.js Providers Configuration
 * ===================================
 * @see https://next-auth.js.org/providers/discord
 * @see https://next-auth.js.org/providers/github
 * @see https://next-auth.js.org/providers/google
 *
 * Note: Normally, when you sign in with an OAuth provider and another account with the same
 * email address already exists, the accounts are not linked automatically. Automatic account
 * linking on sign in is not secure between arbitrary providers and is disabled by default.
 * @see https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/routes/callback/handle-login.ts#L174
 * @see https://github.com/nextauthjs/next-auth/blob/main/docs/docs/guides/providers/custom-provider.md?plain=1#L83
 * @see https://github.com/boxyhq/next-auth/blob/main/docs/docs/reference/adapters/index.md?plain=1#L175
 * @see https://next-auth.js.org/configuration/providers/oauth#allowdangerousemailaccountlinking-option
 * @see https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/oauth.ts#L210
 * @see https://github.com/dustij/dbudget/blob/main/src/app/api/auth/%5B...nextauth%5D/options.ts
 *
 * todo: try to implement our own safe account linking logic if possible
 * @see https://authjs.dev/reference/core/adapters#linkaccount
 */
const providers = [
  CredentialsProvider({
    name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const cred = await loginSchema.parseAsync(credentials);

        const user = await db.sys_user.findFirst({
          where: { 
            user_name: cred.username,
            password: cred.password
          },
        });

        // 帐号或密码错误
        if (!user) {
          return null;
        }

        // 您已被禁用，如需正常使用请联系管理员
        if(user.del_flag === DelFlagEnum.DELETE) {
          return null
        }

        // 您已被停用，如需正常使用请联系管理员
        if(user.status === StatusEnum.STOP) {
          return null
        }
          
        // 创建一个新的对象，只包含用于生成 JWT 的数据
        let jwtUser = {
          user_id: user.user_id.toString(),
          username: user.user_name,
          // 添加其他需要的属性
        };

        const token = await jwtHelper.createAcessToken(jwtUser)

        return {
          id: user.user_id.toString(),
          token: token,
          name: user.user_name,
          accessTokenExpires: new Date().getTime() + 60 * 60 * 1000,
        };
      },
  }),
  env.DISCORD_CLIENT_ID &&
    env.DISCORD_CLIENT_SECRET &&
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 10000,
      }
    }),
  env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 20000,
      }
    }),
  env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 10000,
      }
    }),
  /**
   * ...add more authjs providers here
   *
   * Most other providers require a bit more work than the Discord provider. For example, the
   * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
   * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
   *
   * @see https://next-auth.js.org/providers/github
   */
].filter(Boolean) as Provider[];

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    
    jwt: async ({ token, user, account, profile, isNewUser}) => {
      if (user) {
        token.id = user.id;
        token.username = user.name;
      }
      // on subsequent calls, token is provided and we need to check if it's expired
      // if (token?.accessTokenExpires) {
      //   if (Date.now() / 1000 < token?.accessTokenExpires) return { ...token, ...user };
      // } else if (token?.refreshToken) {
        
      //   // 创建一个新的对象，只包含用于生成 JWT 的数据
      //   let jwtUser = {
      //     user_id: user.id.toString(),
      //     username: user.name,
      //     // 添加其他需要的属性
      //   };
      //   return jwtHelper.createRefreshToken(jwtUser);
      // }


      return token;
    },
    session: ({ session, user }) => {
      if (user && session.user) {
        session.user.id = user.id as string;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: providers,
  pages: {
    signIn: '/signin', // 这是你自定义的登录页面的路径
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
