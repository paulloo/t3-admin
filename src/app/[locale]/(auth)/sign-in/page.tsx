
import GoogleSignInButton from '~/app/components/GoogleSignInButton'
import GithubSignInButton from "~/app/components/GithubSignInButton"

import { getProviders, signIn, useSession } from "next-auth/react"

import { fullURL } from '~/data/meta/builder';
import { getTranslations } from "next-intl/server";
import { Metadata } from 'next';
import { AuthPagesContent } from "~/core/auth/shared/islands/auth-pages-content";
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from "~/navigation";
import { env } from "~/env.mjs";

import { getCurrentUser } from "~/utils/auth/users";
import LoginForm from '~/app/components/LoginForm';

// export const metadata = seo({
export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Sign In",
  description: "Sign into your account",
};
  

export default async function SignInPage() {

  const t = await getTranslations();
  let NextAuthProviders: any;
  let user: any;

  if (env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk") {
    user = await currentUser();
    if (user?.id) return redirect("/auth");
  } else {
    user = await getCurrentUser();
    NextAuthProviders = await getProviders();
    if (!NextAuthProviders) {
      console.error(
        "❌ Specify at least one NextAuth.js provider or switch to Clerk (refer to .env.example)",
      );
      return redirect("/");
    }
    if (user?.id) return redirect("/auth");
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if(formRef?.current) {
      const formData = new FormData(formRef?.current);
      signIn('credentials', {
        callbackUrl: '/',
        redirect: true,
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        
      })
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <AuthPagesContent
          user={user}
          isRegPage={false}
          providers={NextAuthProviders}
          // INTERNATIONALIZATION
          tSignin={t("auth.error.default")}
          tOAuthSignin={t("auth.error.default")}
          tOAuthCallback={t("auth.error.default")}
          tOAuthCreateAccount={t("auth.error.email")}
          tEmailCreateAccount={t("auth.error.default")}
          tCallback={t("auth.error.default")}
          tOAuthAccountNotLinked={t("auth.error.oauthNotLinked")}
          tDefault={t("auth.error.unknown")}
          tUnknownError={t("auth.error.unknown-error")}
          tPrivacy={t("auth.legal-privacy")}
          tTerms={t("auth.legal-terms")}
          tAnd={t("auth.legal-and")}
          tSignUpLink={t("RegisterForm.title")}
          tSignInLink={t("LoginForm.title")}
          tAuthLegal={t("auth.legal")}
          tSignUpHere={t("LoginForm.signup")}
          tNoAccount={t("LoginForm.no-account")}
          tSignInHere={t("RegisterForm.signin")}
          tHaveAccount={t("RegisterForm.have-account")}
          tPleaseWait={t("auth-provider.please-wait")}
        />
       <LoginForm />
    </div>
  )
}
