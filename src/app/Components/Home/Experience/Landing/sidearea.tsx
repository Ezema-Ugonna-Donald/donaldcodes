"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import RecentPosts from "./Sidearea/recentPosts";
import axios from "@/app/(main)/api/axios";

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

type Category = {
    id: number
    user_id: number
    categoryname: string
    created_at: string
    user: User
}

export default function Sidearea() {

    const CATEGORY_URL = "/categories"

    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        try
        {
            const response = await axios.get(CATEGORY_URL)

            if (response?.status === 200)
            {
                setCategories(response.data)
            }
        }
        catch(error)
        {
            console.error(error)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            await getCategories()
        }

        fetchData()
    }, [])

    return (
        <section className="">
        <div className="w-full mb-20 rounded-sm h-auto pb-[0.5px]">
            <div className="rounded-sm font-[Lato-Regular] border-r-[3px] border-r-[#ec0b43] border-t-[3px] border-t-[#ec0b43] border-l-[3px] border-l-[#ec0b43] bg-[#E4EB15]">
                <div className="bg-[#FDE8E9] text-[#000] p-3 pl-5 text-left">Categories</div>
                <div className="p-5 text-left">
                    {
                        categories.length > 0 ?
                        (
                            categories.map(category => (
                                <Link key={category.id} href={`/category/${category.categoryname}`} className="block mb-2 cursor-pointer hover:text-[#ec0b43]">{category.categoryname}</Link>
                            ))
                        ) :
                        (
                            <p className="text-lg uppercase font-bold">Loading..</p>
                        )
                    }
                </div>
            </div>
        </div>
        <div className="w-full rounded-sm h-auto pb-[0.5px] mb-20">
            <div className="rounded-sm font-[Lato-Regular] border-r-[3px] border-r-[#ec0b43] border-t-[3px] border-t-[#ec0b43] border-l-[3px] border-l-[#ec0b43] bg-[#E4EB15]">
                <div className="bg-[#FDE8E9] text-[#000] p-3 pl-5 text-left">Recent Posts</div>
                <div className="p-5 text-left">
                    <RecentPosts />
                </div>
            </div>
        </div>
    </section>
    )
}