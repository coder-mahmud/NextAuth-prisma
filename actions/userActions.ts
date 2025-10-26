"use server";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

// Define the shape of the input
interface CreateUserInput {
  email: string,
  name: string,
  password: string,
  image?: string,
  role?:string

}

// Server action to create a user
export async function createUser(input: CreateUserInput) {
  try {
    const { email, name, password } = input;

    const plainPassword = password
    const hashedPassword = hashSync(password,10)
    

    const user = await db.user.create({
      data: { email, name, password:hashedPassword },
    });

    return { message: "User created", user };
  } catch (error) {
    console.error("user creation error:", error);
    throw new Error("Failed to create user");
  }
}


// Sign in user with creds
export async function signInWithCredentirals(prevState: unknown, formData: FormData){

  try {
    const user = {
      email: formData.get('email'), 
      password: formData.get('password'),
      // redirect: false,
    };

    const signin = await signIn('credentials', user)
    console.log("signin response:",signin)

    return {success: true, message:"Signed in successfully"}
    // redirect("/profile");


  } catch (err) {
    console.log("signin error:", err)
    if(isRedirectError(err)){
      console.log("redirect error:", err)
      throw err
    }
    
    return {success: false, message:"Invalid email or password!"}
  }

}


export async function signOutUser(){
  await signOut();
}
