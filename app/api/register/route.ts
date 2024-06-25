import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import db from "@/app/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {email, name, password} = await request.json();
    const data = await db.user.create({
      data: {
        email,
        name,
        hashedPassword: await bcrypt.hash(password, 10),
      }
    })
    return new NextResponse(
      JSON.stringify({
        message: "Account created successfully!",
        data: data
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        error: "Failed to register",
        message: error,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
