import React from 'react'
import Logo from './../../assets/logo/donaldcodesLogo.jpg'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaGlobe } from "react-icons/fa";

const Ad = () => {
  return (
    <section>
        <div className="w-[70%] text-center m-auto mt-40">
            <div className="w-full border-r-0">
                <div className="flex justify-center ">
                    <div className="border-l-8 border-[#ec0b43] border-t-2 border-b-2">
                        <img src={Logo} alt="" className="w-72" />
                    </div>
                    <div className="text-[#FDE8E9] w-1/2 p-3 border-t-2 border-b-2 border-[#FDE8E9] align-top bg-transparent">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div className="m-0 bg-transparent border px-4 align-top rounded-t-sm">
                        <div className="font-[Lato-Heavy] text-[#FDE8E9] mb-3">
                            Pello Tech
                        </div>
                        <p className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><MdEmail size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">example@gmail.com</span></span></p>
                        <p className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><FaPhoneAlt size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">+234704533331</span></span></p>
                        <p className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><FaGlobe size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">www.example.com</span></span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Ad