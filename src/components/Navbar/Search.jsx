import React, { useState } from 'react'
import SearchIcon from './../../assets/icons/ug-search.png'

const Search = () => {
    
    const [isSearchVisible, setSearchVisible] = useState(false)

  return (
    <div className="p-[1%] basis-4/12 flex ml-[4.5%] mr-[9%]">            
        <div className="">
            <form action="" method="get">
                <div>
                    <img src={SearchIcon} onMouseOver={() => setSearchVisible(!isSearchVisible)} className="w-[2.2em] h-[2.2em] transition-[display] delay-150 hover:w-[2.8em] hover:h-[2.8em] hover:rotate-[15deg]" alt="Search Icon" />
                </div>
                {
                    isSearchVisible ?
                    
                        (
                        <div className="bg-[#E4EB15] -ml-[1em] h-auto w-[18rem] transition-[display] delay-[1500ms] z-50">
                            <div>
                                <input type="text" name="search" className="border-none bg-[#E4EB15] outline-none h-[3rem] text-[#262626] w-[18rem] text-xl py-[5px] px-[12px]" placeholder="Search" />
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

export default Search