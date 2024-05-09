import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: [{ rel: 'icon', url: "/assets/logo/donaldcodesLogo.jpg" }],
  title: "Donald Codes",
  description: "A tech blog for software developers of all levels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo/donaldcodesLogo.jpg" />
      </head>
      <body>
        <div className="bg-black font-[Lato-Regular]">
          <Navbar />
          {children}
        </div>
        <footer className="w-full h-full p-3 bg-[#6B7400]">&copy; Copyright, All rights Reserved. {new Date().getFullYear()}</footer>
      </body>
    </html>
  );
}