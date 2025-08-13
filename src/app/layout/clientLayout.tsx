"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/(main)/components/navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-black font-[Lato-Regular] overflow-x-hidden">
      {!pathname.includes("/cms") && <Navbar />}
      {children}
      {!pathname.includes("/cms") && (
        <footer className="w-full p-3 bg-[#6B7400]">
          &copy; Copyright, All rights Reserved. {new Date().getFullYear()}
        </footer>
      )}
    </div>
  );
}
