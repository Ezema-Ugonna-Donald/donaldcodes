import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './../assets/logo/donaldcodesLogo.jpg'
import MenuIcon from './../assets/icons/ug-menu.png'
import Search from './Navbar/Search'
import Menu from './Navbar/Menu'

const Navbar = () => {
    const [isMenuVisible, setMenuVisible] = useState(false)

  return (
    <header className="z-10">
        <nav className="">
            <div className="flex bg-[#ec0b43] h-16 mx-[3.5%]">
                <Search />

                <Link to="/" title="home button" className='basis-1/12'>
                    <div>
                        <img src={Logo} alt="Donald Codes Logo" className="w-[53px] mt-[6px] border rounded-full" />
                    </div>               
                </Link>
                
                <div className="ml-[25rem] pointer">
                        <img src={MenuIcon} onMouseOver={() => setMenuVisible(!isMenuVisible)} alt="Menu" className="w-[5.5em] mt-[1rem] transition-[scale] delay-150 hover:scale-[1.23] hover:-translate-x-[20px]" />
                </div>
            </div>
            <Menu isMenuVisible={isMenuVisible} />
        </nav>
    </header>
  )
}

export default Navbar