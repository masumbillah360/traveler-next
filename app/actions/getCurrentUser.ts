'use server'

import db from "../libs/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email: session.user?.email!
      }
    })
    if(!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.log(["GET CURRENT USER ERROR:"], error);
    return null;
  }
}
