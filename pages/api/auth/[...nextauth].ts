import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import db from "@/app/libs/db";
import { NextRequest } from "next/server";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        if (!user) {
          return null;
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword!
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
