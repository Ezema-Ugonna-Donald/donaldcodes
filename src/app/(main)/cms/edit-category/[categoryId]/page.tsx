"use client"

import { FormEvent, useState, useEffect } from "react"
import axios from "@/app/(main)/api/axios"
import { useRouter } from "next/navigation"

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

export default function EditCategory({params}: {
    params: { categoryId: string }
}) {
    const { push } = useRouter()
    const [cat, setCat] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const CATEGORY_URL: string = "/categories"
    const [category, setCategory] = useState<Category>({
        id: 0,
        user_id: 0,
        categoryname: "",
        created_at: "",
        user: {
            id: 0,
            name: "",
            email: "",
            password: "",
            created_by: "",
            created_at: ""
        }
    })

    const getCategory = async (id: number) => {
        try
        {
            const response = await axios.get(`${CATEGORY_URL}/${id}`)

            if (response?.status === 200)
            {
                setCategory(response.data)
            }
        }
        catch(error)
        {
            console.error(error)
        }

    }

    const editCategory = async (e: FormEvent<HTMLFormElement>, categoryname: string) => {
        e.preventDefault()
        try 
        {
            const response = await axios.patch(`${CATEGORY_URL}/${params.categoryId}`, {
                categoryname: categoryname
            })

            if (response?.status === 200)
            {
                setSuccess(true)
                setError(false)
                
                push("/cms/manage-categories")
            }
            else
            {
                setError(true)
                setSuccess(false)
            }
        }
        catch (error) 
        {
            console.error(error)    
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getCategory(Number(params.categoryId))
        }

        fetchData()
    }, [])
    
    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Edit Category</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Category Updated Successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to update category</div>): null}
            <form className="mt-5" method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => editCategory(e, cat)}>
                <div className="mb-3">
                    <span className="block">Selected Category: {category.categoryname}</span>
                    <label className="block" htmlFor="category">Category:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="category" id="category" placeholder="Enter category..." value={cat} onChange={(e) => setCat(e.target.value)} />
                </div>
                <button disabled={!cat} className="bg-[#15eb5c] disabled:bg-[#6cf098] border border-black rounded-md w-1/2 h-12" type="submit">Update Category</button>
            </form>
        </section>
    )
}