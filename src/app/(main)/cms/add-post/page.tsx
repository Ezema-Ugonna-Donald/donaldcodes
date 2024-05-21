"use client"

import { useEffect, useState } from "react"
import axios from "@/app/(main)/api/axios"
import { Cloudinary } from "@cloudinary/url-gen"

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

export default function AddPost() {
    const [title, setTitle] = useState("")
    const [cat, setCat] = useState("")
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

    const cld = new Cloudinary({ cloud: { cloudName: "dksseztgi", apiKey: "", apiSecret: "" } })

    const uploadImage = async (title: string, category: string, postImage: File, body: string) => {
        cld.u


    useEffect(() => {
        const fetchData = async () => {
            await getCategories()
        }

        fetchData()
    }, [])

    return (
        <section className="p-8">
            <h1 className="font-[Oswald-Bold] text-xl">Add New Post</h1>
            <form className="mt-5">
                <div className="mb-3">
                    <label className="block" htmlFor="title">Title:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="title" id="title" placeholder="Enter title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="category">Category:</label>
                    <select className="w-1/2 outline-none h-12 border bg-white border-black p-3 rounded-md" name="category" id="category" value={cat} onChange={e => setCat(e.target.value)}>
                        <option value="" disabled>Select-Category</option>
                        {
                            categories.map(category => (
                                <option value={category.categoryname}>{category.categoryname}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="postImage">Post Image:</label>
                    <input className="w-1/2 outline-none h-12 border mb-3 border-black p-3 rounded-md" type="file" name="postImage" id="postImage" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </form>
        </section>
    )
}