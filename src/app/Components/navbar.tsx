"use client"

import Link from "next/link"
import { useState } from "react"
import Image from "next/image"
import Menu from "@/app/components/navbar/menu"
import Search from "@/app/components/navbar/search"

export default function Navbar() {
    const [isMenuVisible, setMenuVisible] = useState(false)

    return (
        <header className="z-10">
        <nav className="">
            <div className="flex bg-[#ec0b43] h-16 mx-[3.5%]">
                <Search />

                <Link href="/" title="home button" className='basis-1/12'>
                    <div>
                        <img src="/assets/logo/donaldcodesLogo.jpg" alt="Donald Codes Logo" className="w-[53px] mt-[6px] border rounded-full" />
                    </div>               
                </Link>
                
                <div className="ml-[25rem] pointer">
                        <img src="/assets/icons/ug-menu.png" onMouseOver={() => setMenuVisible(!isMenuVisible)} alt="Menu" className="w-[5.5em] mt-[1rem] transition-[scale] delay-150 hover:scale-[1.23] hover:-translate-x-[20px]" />
                </div>
            </div>
            <Menu isMenuVisible={isMenuVisible} />
        </nav>
    </header>
    )
}