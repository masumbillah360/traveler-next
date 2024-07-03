import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";

import Navbar from "./components/shared/navbar/Navbar";

import "./globals.css";

import RentModal from "./components/modals/RentModal";
import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import SearchModal from "./components/modals/SearchModal";
import RegisterModal from "./components/modals/RegisterModal";

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
        <SearchModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
