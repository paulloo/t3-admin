'use client'

import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from "~/islands/primitives/button"
import {
    GoalIcon
} from "lucide-react"

const GoogleSignInButton = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  return (
    <Button
      className='w-full'
      onClick={() => signIn('google', { callbackUrl })}
    >
      <GoalIcon />
      Continue with Google
    </Button>
  )
}

export default GoogleSignInButton