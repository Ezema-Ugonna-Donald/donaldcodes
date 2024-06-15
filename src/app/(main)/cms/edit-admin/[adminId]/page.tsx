"use client"

import { FormEvent, useEffect, useState } from "react"
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

export default function EditAdmin({ params }: {
    params: { adminId: string }
}) {
    const { push } = useRouter()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [admin, setAdmin] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
        created_by: "",
        created_at: ""
    })
    
    const ADMIN_URL: string = "/users/admin"
    // const ADMIN_GET_URL: string = "/users/admin"

    const getAdmin = async (id: number) => {
        try 
        {
            const response = await axios.get(`${ADMIN_URL}/${id}`)

            if (response?.status === 200)
            {
                setAdmin(response.data)
            }
        } 
        catch (error) 
        {
            
        }
    }

    const editAdmin = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        try 
        {
            const response = await axios.patch(`${ADMIN_URL}/${params.adminId}`, {
                name: name,
                email: email,
                password: password,
                created_by: "Donald Ezema"
            })
    
            if (response?.status === 200)
            {
                setSuccess(true)
                setError(false)

                push("/cms/manage-admins")
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
            await getAdmin(Number(params.adminId))
        }

        fetchData()
    }, [])
    
    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Edit Admin</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Admin Updated Successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to update admin</div>): null}
            <form method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => editAdmin(e)}>
                <div className="mb-3">
                    <span className="block">Selected Name: {admin.name}</span>
                    <label className="block" htmlFor="name">Name:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="name" id="name" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <span className="block">Selected Email: {admin.email}</span>
                    <label className="block" htmlFor="email">Email:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="email" name="email" id="email" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="password">Password:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="password" name="password" id="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button disabled={!name && !email && !password} className="bg-[#15eb5c] disabled:bg-[#6cf098] border border-black rounded-md w-1/2 h-12" type="submit">Update Admin User</button>
            </form>
        </section>
    )
}