"use server";
import { db } from "@/lib/db";
import { hashSync } from "bcrypt-ts-edge";

// Define the shape of the input
interface CreateUserInput {
  email: string,
  userName: string,
  password: string,
  image?: string,
  role?:string

}

// Server action to create a user
export async function createUser(input: CreateUserInput) {
  try {
    const { email, userName, password } = input;

    const plainPassword = password
    const hashedPassword = hashSync(password,10)
    

    const user = await db.user.create({
      data: { email, userName, password:hashedPassword },
    });

    return { message: "User created", user };
  } catch (error) {
    console.error("user creation error:", error);
    throw new Error("Failed to create user");
  }
}
