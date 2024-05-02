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
        <div className="p-[1%] basis-4/12 flex ml-[4.5%] mr-[9%]">            
        <div className="">
            <form action={`/search/${searchText}`} method="post">
                <div>
                    <img src="/assets/icons/ug-search.png" onMouseOver={() => setSearchVisible(!isSearchVisible)} className="w-[2.2em] h-[2.2em] transition-[display] delay-150 hover:w-[2.8em] hover:h-[2.8em] hover:rotate-[15deg]" alt="Search Icon" />
                </div>
                {
                    isSearchVisible ?
                    
                        (
                        <div className="bg-[#E4EB15] -ml-[1em] h-auto w-[18rem] transition-[display] delay-[1500ms] z-50">
                            <div>
                                <input onKeyDown={keyDownHandler} value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" name="search" className="border-none bg-[#E4EB15] outline-none h-[3rem] text-[#262626] w-[18rem] text-xl py-[5px] px-[12px]" placeholder="Press Enter to Search" />
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