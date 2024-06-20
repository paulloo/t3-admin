'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "~/components/ui/button"
import {
    Github
} from "lucide-react"

const GithubSignInButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  return (
    <Button
      className='w-full'
      onClick={() => signIn('github', { callbackUrl })}
    >
      <Github />
      Continue with Github
    </Button>
  )
}

export default GithubSignInButton