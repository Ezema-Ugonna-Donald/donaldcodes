"use client"

import Link from "next/link"
import { useState } from "react"
import Menu from "@/app/(main)/components/navbar/menu"
import Search from "@/app/(main)/components/navbar/search"

export default function Navbar() {
    const [isMenuVisible, setMenuVisible] = useState(false)

    return (
        <header className="z-10">
        <nav className="">
            <div className="flex bg-[#ec0b43] h-16 items-center gap-10 justify-center 2xl:mx-[3.5%] xl:mx-[3.5%] lg:mx-[3.5%] md:mx-[3.5%]">
                <Search />

                <Link href="/" title="home button" className="2xl:basis-1/12 xl:basis-1/12 lg:basis-1/12 md:basis-1/3">
                    <div>
                        <img src="/assets/logo/donaldcodesLogo.jpg" alt="Donald Codes Logo" className="w-[53px] mt-[6px] border rounded-full" />
                    </div>               
                </Link>
                
                <div className="ml-96 pointer md:ml-32 sm:ml-24">
                        <img src="/assets/icons/ug-menu.png" onClick={() => setMenuVisible(!isMenuVisible)} alt="Menu" className="w-[5.5em] mt-[1rem] transition-[scale] delay-150 hover:scale-[1.23] hover:-translate-x-[20px]" />
                </div>
            </div>
            <Menu isMenuVisible={isMenuVisible} />
        </nav>
    </header>
    )
}