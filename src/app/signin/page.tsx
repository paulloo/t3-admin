'use client';

import { Button } from "~/components/ui/button"
import Link from 'next/link';
import GoogleSignInButton from '~/app/components/GoogleSignInButton'
import TextField from '~/app/components/TextField'
import GithubSignInButton from "../components/GithubSignInButton"
import { Form } from "../components/Form"
import { signIn, useSession } from "next-auth/react"
import { SubmitButton } from "../components/submit-button"
import { useRef } from "react";

const SignInPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your username and password to sign in
          </p>
        </div>
        <Form
          formref={formRef}
          submit={handleSubmit}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
        <GoogleSignInButton />
        <GithubSignInButton />
      </div>
    </div>
  )
}

export default SignInPage