"use client"

import { FormEvent, useEffect, useState } from "react"
import axios from "@/app/(main)/api/axios"
import Link from "next/link"
import { FaEdit, FaTrash } from "react-icons/fa"

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

export default function ManageCategories() {
    const [category, setCategory] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const CATEGORY_URL: string = "/categories"
    const CATEGORY_ADD_URL: string = "/categories/add-category"

    const [categories, setCategories] = useState<Category[]>([])
    
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let no = 0

    const addCategory = async (e: FormEvent<HTMLFormElement>, category: string) => {
        e.preventDefault()

        try 
        {
            const response = await axios.post(CATEGORY_ADD_URL, {
                user_id: 5,
                categoryname: category
            })

            if (response?.status === 201)
            {
                setSuccess(true)
                setError(false)
                await getCategories()
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

    const deleteCategory = async (id: number) => {
        try
        {
            const response = await axios.delete(`${CATEGORY_URL}/${id}`)

            if (response?.status === 200)
            {
                await getCategories()   
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
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Add New Category</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Category Added Successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to add category</div>): null}
            <form className="mt-5" method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => addCategory(e, category)}>
                <div className="mb-3">
                    <label className="block" htmlFor="category">Category:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="category" id="category" placeholder="Enter category..." value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <button disabled={!category} className="bg-[#15eb5c] disabled:bg-[#6cf098] border border-black rounded-md w-1/2 h-12" type="submit">Add Category</button>
            </form>

            <div className="mt-8">
                <table className="table-fixed border-collapse border-spacing-2">
                    <thead className="bg-[#E4EB15]">
                        <tr className="">
                            <th className="p-4">No.</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(cat => {
                                no++

                                return (
                                    <tr key={cat.id}>
                                        <td className="p-4">{no}</td>
                                        <td className="p-4">{cat.categoryname}</td>
                                        <td className="p-4">{new Date(cat.created_at).toLocaleDateString("en-US", options)}</td>
                                        <td className="p-4 flex align-middle"><Link href={`/cms/edit-category/${cat.id}`} className="mr-3"><FaEdit color="#4b6dca" /></Link><span className="cursor-pointer" onClick={() => deleteCategory(cat.id)}><FaTrash color="#f76186" /></span></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}