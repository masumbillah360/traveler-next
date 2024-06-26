import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";

import Navbar from "./components/shared/navbar/Navbar";

import "./globals.css";

import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traveler App",
  description: "A Traveler App created by Masum Billah",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
