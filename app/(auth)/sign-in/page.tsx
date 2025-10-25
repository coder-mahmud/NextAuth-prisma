import { redirect } from "next/navigation"
import CredentialSignInForm from "./credentials-signinform"
import { auth } from "@/auth"




const SigninPage = async (props:{
  searchParams:Promise<{callbackUrl:string}>
}) => {

  const {callbackUrl} = await props.searchParams

  const session = await auth();
  //console.log("session", session)

  if(session){
    return redirect(callbackUrl || '/profile')
  }



  return (
    <>
      <h1>Sign In</h1>
      <CredentialSignInForm />
    </>
  )
}

export default SigninPage