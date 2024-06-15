"use client"

import { useState, useEffect } from "react"
import axios from "@/app/(main)/api/axios";
import { FaGlobe, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

type Ad = {
    id: number
    user_id: number
    companyname: string
    companyEmail: string
    companyPhone: string
    companyWebsite: string
    adImage: string
    body: string
    user: User,
    created_at: string
    updated_at: string
}

export default function Ad() {
    const [ads, setAds] = useState<Ad[]>([])
    const [currentAd, setCurrentAd] = useState<number>(0)

    const AD_GET_URL: string = "/ads"

    // let currentAd: number = 0

    const getAds = async () => {
        try 
        {
            const response = await axios.get(AD_GET_URL)

            if (response?.status === 200)
            {
                setAds(response.data)
            }
        } 
        catch (error) 
        {
            console.error(error)   
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAds()
        }

        fetchData()

        const interval = setInterval(() => {

            setCurrentAd(currentAd + 1)

            if (ads.length - 1 === currentAd)
            {   
                setCurrentAd(0)
            }
        }, 6100)

        return () => clearInterval(interval)
    }, [currentAd])

    return (
        <section>
            <div className="w-[70%] text-center m-auto mt-40">
                <div className="w-full border-r-0">
                    {
                        ads.length > 0 ?
                        (
                            <div className="flex justify-center">
                                <div className="border-l-8 border-[#ec0b43] border-t-2 border-b-2">
                                    <img src={ads[currentAd].adImage} alt="Advert Image" className="w-[50%]" />
                                </div>
                                <div className="text-[#FDE8E9] w-1/2 p-3 border-t-2 border-b-2 border-[#FDE8E9] align-top bg-transparent">
                                    {ads[currentAd].body}
                                </div>
                                <div className="m-0 bg-transparent border px-4 align-top rounded-t-sm">
                                    <div className="font-[Lato-Heavy] text-[#FDE8E9] mb-3">
                                        {ads[currentAd].companyname}
                                    </div>
                                    <p className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><MdEmail size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">{ads[currentAd].companyEmail}</span></span></p>
                                    <p className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><FaPhoneAlt size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">{ads[currentAd].companyPhone}</span></span></p>
                                    {
                                        ads[currentAd].companyWebsite === null ? null : (<Link href={ads[currentAd].companyWebsite} target="_blank" className="align-middle my-4 font-[Lato-Bold]"><span className="flex justify-start align-bottom "><FaGlobe size={23} color="#FDE8E9"/><span className=" ml-5 text-[#FDE8E9] align-top">{ads[currentAd].companyWebsite}</span></span></Link>)
                                    }
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </section>
    )
}