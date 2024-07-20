
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
                    <div className="h-auto 2xl:h-14 xl:h-14 lg:h-14 md:h-14 mx-[3.5%] bg-transparent border rounded-b-full transition-[display] delay-300 z-40">
                        <div className="block 2xl:flex xl:flex lg:flex md:flex pl-[5%] text-white text-center">
                            <Link href="/" className="sm:block p-[1%] mr-[10%] basis-1/4">
                                Home
                            </Link>
                            <Link href="" className="sm:block p-[1%] mr-[10%] basis-1/4">
                                Games
                            </Link>
                            <Link onClick={() => setCategoriesVisible(!isCategoriesVisible)} href="" className="sm:block p-[1%] mr-[10%] basis-1/4">
                                {/* <div className="navbar-tab dropdown">Genres</div> */}
                                Categories
                            </Link>
                            <Link href="" className="sm:block p-[1%] mr-[10%] basis-1/4">
                                About
                            </Link>
                            <Link href="" className="sm:block p-[1%] mr-[10%] basis-1/4">
                                Contact
                            </Link>
                        </div>
                    </div>
                    {
                        isCategoriesVisible ? 
                        (
                            <div className="absolute z-50 px-3 w-auto 2xl:w-36 xl:w-36 lg:w-36 md:w-36 2xl:mt-1 xl:mt-1 lg:mt-1 md:mt-1 -mt-20 left-[63%] 2xl:left-[43%] xl:left-[43%] lg:left-[43%] md:left-[43%] text-center bg-[#E4EB15] text-black">
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