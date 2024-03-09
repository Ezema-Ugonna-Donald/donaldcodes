import React from 'react'
import { Link } from 'react-router-dom'

const Menu = ({isMenuVisible = false}) => {

  return (
    <>
        {
            isMenuVisible ?
            (
                <div className="h-14 mx-[3.5%] bg-transparent border rounded-b-full transition-[display] delay-300 z-40">
                    <div className="flex pl-[5%] text-white text-center">
                        <Link to="/" className="p-[1%] mr-[10%] basis-1/4">
                            Home
                        </Link>
                        <Link to="" className="p-[1%] mr-[10%] basis-1/4">
                            Games
                        </Link>
                        <Link to="" className="p-[1%] mr-[10%] basis-1/4">
                            {/* <div className="navbar-tab dropdown">Genres</div> */}
                            Categories
                        </Link>
                        <Link to="" className="p-[1%] mr-[10%] basis-1/4">
                            About
                        </Link>
                        <Link to="" className="p-[1%] mr-[10%] basis-1/4">
                            Contact
                        </Link>
                    </div>
                </div>
            ) : null
        }
    </>
  )
}

export default Menu