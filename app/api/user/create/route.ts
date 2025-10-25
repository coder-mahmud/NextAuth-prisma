import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Define the shape of your request body
interface RequestBody {
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    const { email } = body;

    // Example: do something with the email
    const user = await db.user.create({
      data: {
        email
      },
    });

    return NextResponse.json({ message: `User created`, user },{status:200});
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
