import { redirect } from "next/navigation"
import CredentialSignInForm from "./credentials-signinform"
import { auth, signIn } from "@/auth"




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
      <form action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <div className="flex justify-center mt-11">
          <button className='cursor-pointer hover:text-black hover:bg-white border border-black  transition-all duration-300 mx-auto'>Signin with Google</button>
        </div>
      </form>
    </>
  )
}

export default SigninPage