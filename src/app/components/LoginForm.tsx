'use client'

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Form } from "~/app/components/Form"
import { useRef } from "react";
import { SubmitButton } from "~/app/components/submit-button"
import type { ILogin } from "~/validation/auth";
import Link from 'next/link';
const LoginForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    await signIn("credentials", { ...data, callbackUrl: "/" });
  };

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