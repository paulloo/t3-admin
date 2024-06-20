'use client';

import Link from 'next/link';
import { Form } from '~/app/components/Form';
import { redirect } from 'next/navigation';
import { api } from "~/trpc/server";
import { SubmitButton } from '~/app/components/submit-button';
import { useRef } from 'react';

export default async function SignupPage() {
    
//     const getUser = await api.dept.getlist().catch((err) => {
//         console.error(err);
//         return [];
//     })

//   const createUser = await api.dept.create({
//     parentId: 1,
//     deptName: 'test',
//     orderNum: 1,
//     leader: 'test',
//     phone: 'test',
//     status: 'test',
//   }).catch((err) => {
//     console.error(err);
//     return [];
//   })

  

  async function register(e: any) {
    
    e.preventDefault();
    if(formRef?.current) {
      const formData = new FormData(formRef?.current);
      let username = formData.get('email') as string;
      let password = formData.get('password') as string;
      let user = await api.dept.getlist().catch((err) => {
          console.error(err);
          return [];
      })
  
      if (user.length > 0) {
        return 'User already exists'; // TODO: Handle errors with useFormStatus
      } else {
        await api.dept.create({
          parentId: 1,
          deptName: 'test',
          orderNum: 1,
          leader: 'test',
          phone: 'test',
          status: 'test',
        }).catch((err) => {
          console.error(err);
          return [];
        })
      ;
        redirect('/signin');
      }
    }
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <Form submit={register} formref={formRef}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/signin" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </Form>
      </div>
    </div>
  );
}