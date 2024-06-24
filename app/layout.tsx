import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "./components/shared/navbar/Navbar";
import Modal from "./components/modals/Modal";

import "./globals.css";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Traveler App",
  description: "A Traveler App created by Masum Billah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
