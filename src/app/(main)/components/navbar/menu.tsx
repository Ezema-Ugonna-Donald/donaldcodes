
"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
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

export default function Menu({isMenuVisible}: {
    isMenuVisible: boolean
}) {

    const [isCategoriesVisible, setCategoriesVisible] = useState(false)

    const CATEGORY_URL: string = "/categories"

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
        <>
            {
            isMenuVisible ?
            (
                <>
                    <div className="h-14 mx-[3.5%] bg-transparent border rounded-b-full transition-[display] delay-300 z-40">
                        <div className="flex pl-[5%] text-white text-center">
                            <Link href="/" className="p-[1%] mr-[10%] basis-1/4">
                                Home
                            </Link>
                            <Link href="" className="p-[1%] mr-[10%] basis-1/4">
                                Games
                            </Link>
                            <Link onMouseOver={() => setCategoriesVisible(!isCategoriesVisible)} href="" className="p-[1%] mr-[10%] basis-1/4">
                                {/* <div className="navbar-tab dropdown">Genres</div> */}
                                Categories
                            </Link>
                            <Link href="" className="p-[1%] mr-[10%] basis-1/4">
                                About
                            </Link>
                            <Link href="" className="p-[1%] mr-[10%] basis-1/4">
                                Contact
                            </Link>
                        </div>
                    </div>
                    {
                        isCategoriesVisible ? 
                        (
                            <div className="absolute z-50 w-36 mt-1 left-[43%] text-center bg-[#E4EB15] text-black">
                                {
                                    categories.length > 0 ?
                                    (
                                        categories.map(category => (
                                            <Link key={category.id} className="hover:text-[#414040] block mb-2" href={`/category/${category.categoryname}`}>{category.categoryname}</Link>
                                        ))
                                    ) :
                                    (
                                        <p className="text-sm uppercase font-bold">Loading..</p>
                                    )
                                }
                            </div>
                        ) : null
                    }
                </>
            ) : null
        }
        </>
    )
}