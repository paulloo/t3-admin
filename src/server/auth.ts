import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { AuthUser, jwtHelper, tokenOneDay, tokenOnWeek } from "~/lib/jwtHelper";
import type { Provider } from "next-auth/providers/index";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { loginSchema } from "~/validation/auth";
import { DelFlagEnum, StatusEnum, UserStatus } from "~/lib/enum";
import { md5 } from "~/lib/utils";

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
          username: cred.username,
          status: UserStatus.Enabled,
        },
      });

      // 帐号或密码错误
      if (!user) {
        return null;
      }
      const comparePassword = md5(`${cred.password}${user.psalt}`)

      if (user.password !== comparePassword) {
        return null;
      }

      const role = db.sys_role.findFirst({
        where: {
          id: user.id,
        }
      })

      return {
        id: user.id.toString(),
        name: user.username,
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
      },
    }),
  env.GITHUB_CLIENT_ID &&
    env.GITHUB_CLIENT_SECRET &&
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 20000,
      },
    }),
  env.GOOGLE_CLIENT_ID &&
    env.GOOGLE_CLIENT_SECRET &&
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 10000,
      },
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


interface jwtUser {
  id: string;
  username: string;
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // credentials provider:  Save the access token and refresh token in the JWT on the initial login
      if (user){
        const authUser = {id: user.id, username: user.name} as AuthUser;

        const accessToken = await jwtHelper.createAcessToken(authUser);
        const refreshToken = await jwtHelper.createRefreshToken(authUser);
        const accessTokenExpired = Date.now() /1000 + tokenOneDay;
        const refreshTokenExpired = Date.now() /1000 + tokenOnWeek;

        return {
          ...token, accessToken, refreshToken, accessTokenExpired, refreshTokenExpired,
          user: authUser
        }

      } else {
        if (token){
          // In subsequent requests, check access token has expired, try to refresh it
          if (Date.now() /1000 > token.accessTokenExpired){
            const verifyToken = await jwtHelper.verifyToken(token.refreshToken);

            if (verifyToken){

              const user = await db.user.findFirst({
                where: {
                  name: token.user.username
                }
              });

              if (user){
                const accessToken = await jwtHelper.createAcessToken(token.user);
                const accessTokenExpired = Date.now() /1000 + tokenOneDay;

                return {...token, accessToken, accessTokenExpired}
              } 
            }

            return {...token, error: "RefreshAccessTokenError"}
          }
        }
      }

      return token
    },
    session: ({ session, token, user }) => {
      if (token){
        session.user = {
          name: token.user.username,
          id: token.user.id
        }
        session.error = token?.error;
      }

      if(user) {
        session.user = {
          id: user.id,
          name: user.name,
        };
      }

      return session
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: providers,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60
  },
  pages: {
    signIn: "/signin", // 这是你自定义的登录页面的路径
    error: '/',
  },
  debug: env.NODE_ENV === "development",
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
