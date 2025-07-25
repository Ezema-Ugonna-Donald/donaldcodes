"use client"


import { usePathname } from 'next/navigation'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/(main)/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  icons: [{ rel: 'icon', url: "/assets/logo/donaldcodesLogo.jpg" }],
  title: "Donald Codes",
  description: "A tech blog for software developers of all levels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  // const jwtToken = localStorage.getItem("token")

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo/donaldcodesLogo.jpg" />
      </head>
      <body suppressHydrationWarning={true}>
        <div className="bg-black font-[Lato-Regular] overflow-x-hidden">
          { !pathname.includes("/cms") ? (<Navbar />) : null}
          {children}
        </div>
        { !pathname.includes("/cms") ? (<footer className="w-full p-3 bg-[#6B7400]">&copy; Copyright, All rights Reserved. {new Date().getFullYear()}</footer>) : null }
      </body>
    </html>
  );
}