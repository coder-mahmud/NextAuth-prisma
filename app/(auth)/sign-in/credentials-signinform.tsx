'use client'
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import Link from "next/link"
import { signInWithCredentirals } from "@/actions/userActions"
import { redirect, useSearchParams } from "next/navigation"


const CredentialSignInForm = () => {

  const [data, action] = useActionState(signInWithCredentirals,{success:false, message:''})

  // console.log("Signin data",data)

  if(data && data.success){
    redirect('/profile')
  }

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  
  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <button disabled={pending} className='w-full'>
        {pending ? 'Signing In...' : 'Sign In'}
      </button>
    );
  };

  return (
    <form className='space-y-6' action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className='space-y-2'>
        <label htmlFor="email">Email</label>
        <input id='email' name='email' type="email" required autoComplete="email" />
      </div>
      <div className='space-y-2'>
        <label htmlFor="email">Password</label>
        <input id='password' name='password' type="password" required autoComplete="password" />
      </div>

      <SignInButton />

      {data && !data.success && (
        <div className="text-center text-destructive">
          {data.message}
        </div>
      )}

      <div className="text-sm text-center text-muted-foreground">
        Don&apos't have an account? <Link href="/sign-up"> Sign up</Link>
      </div>

    </form>
  )
}

export default CredentialSignInForm