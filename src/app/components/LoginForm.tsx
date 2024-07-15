'use client'

import React from "react";
import { signIn } from "next-auth/react";
import { Form } from "~/app/components/Form"
import { useRef } from "react";
import { SubmitButton } from "~/app/components/submit-button"
import Link from 'next/link';
const LoginForm = () => {
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
  );
};

export default LoginForm;