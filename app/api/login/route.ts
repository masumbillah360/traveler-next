import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import db from "@/app/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    
  try {
    const { email, password } = await request.json();
    const data = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!data) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        })
      );
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      data.hashedPassword!
    );
    if (!isCorrectPassword) {
      return new NextResponse(
        JSON.stringify({
          message: "Password did not match!",
        })
      );
    }
    await signIn("credentials", { email: data.email, password: password, redirect: false });
    return NextResponse.redirect("/");
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to login",
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
