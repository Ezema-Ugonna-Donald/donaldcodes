"use client"

import { useState } from "react"
import Image from "next/image"

export default function Search () {
    const [isSearchVisible, setSearchVisible] = useState(false)

    const [searchText, setSearchText] = useState("")

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
          setSearchText(searchText)
        }
    }
    
    return (
        <div className="p-3 mr-16 2xl:p-[1%] xl:p-[1%] lg:p-[1%] md:p-[1%] 2xl:basis-4/12 xl:basis-4/12 lg:basis-4/12 md:basis-1/2 2xl:flex xl:flex lg:flex 2xl:ml-[4.5%] xl:ml-[4.5%] lg:ml-[4.5%] 2xl:mr-[9%] xl:mr-[9%] lg:mr-[9%]">            
        <div className="">
            <form action={`/search/${searchText}`} method="post">
                <div>
                    <img src="/assets/icons/ug-search.png" onMouseOver={() => setSearchVisible(!isSearchVisible)} className="w-10 2xl:w-[2.2em] xl:w-[2.2em] lg:w-[2.2em] md:w-[2.2em] 2xl:h-[2.2em] xl:h-[2.2em] lg:h-[2.2em] md:h-[2.2em] transition-[display] delay-150 hover:mt-11 2xl:hover:w-[2.8em] xl:hover:w-[2.8em] lg:hover:w-[2.8em] md:hover:w-[2.8em] 2xl:hover:h-[2.8em] xl:hover:h-[2.8em] lg:hover:h-[2.8em] md:hover:h-[2.8em] 2xl:hover:rotate-[15deg] xl:hover:rotate-[15deg] lg:hover:rotate-[15deg] md:hover:rotate-[15deg]" alt="Search Icon" />
                </div>
                {
                    isSearchVisible ?
                    
                        (
                        <div className="bg-[#E4EB15] -ml-[1em] h-auto w-8 2xl:w-[18rem] xl:w-[18rem] lg:w-[18rem] md:w-[18rem] transition-[display] delay-[1500ms] z-50">
                            <div>
                                <input onKeyDown={keyDownHandler} value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" name="search" className="border-none bg-[#E4EB15] outline-none h-6 2xl:h-[3rem] xl:h-[3rem] lg:h-[3rem] md:h-[3rem] text-[#262626] 2xl:w-[18rem] xl:w-[18rem] lg:w-[18rem] md:w-[18rem] w-44 text-sm 2xl:text-xl xl:text-xl lg:text-xl md:text-xl py-[5px] px-[12px]" placeholder="Press Enter to Search" />
                            </div>
                        </div>
                        )  
                    : null
                }
            </form>
        </div>
    </div>
    )
}