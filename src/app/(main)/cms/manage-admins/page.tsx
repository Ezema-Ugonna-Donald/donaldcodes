"use client"

import { FormEvent, useEffect, useState } from "react"
import axios from "@/app/(main)/api/axios"
import Link from "next/link"
import { FaEdit, FaTrash } from "react-icons/fa"
import useAxiosPrivate from "@/app/(main)/hooks/useAxiosPrivate"
import useAuth from "@/app/(main)/hooks/useAuth"

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

export default function ManageAdmins() {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [admins, setAdmins] = useState<User[]>([])

    const ADMIN_URL: string = "/users/add-admin"
    const ADMIN_GET_URL: string = "/users/admins"
    const ADMIN_DELETE_URL: string = "/users/admin"

    let no: number = 0
    
    const options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const addAdmin = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        try 
        {
            const response = await axiosPrivate.post(ADMIN_URL, {
                name: name,
                email: email,
                password: password,
                created_by: auth?.name == undefined ? window.localStorage.getItem("name") : auth?.name
            })
    
            if (response?.status === 201)
            {
                setSuccess(true)
                setError(false)
                await getAdmins()
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

    const getAdmins = async () => {
        try
        {
            const response = await axiosPrivate.get(ADMIN_GET_URL)

            if (response?.status === 200)
            {
                setAdmins(response.data)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    const deleteAdmin = async (id: number) => {
        try 
        {
            const response = await axiosPrivate.delete(`${ADMIN_DELETE_URL}/${id}`)

            if (response?.status === 200)
            {
                await getAdmins()
            }
        } 
        catch (error) 
        {
            console.error(error)    
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getAdmins()
        }

        fetchData()
    }, [])

    return (
        <section className="p-8">
            <h1 className="font-[Lato-Bold] text-xl">Manage Admins</h1>
            {success ? (<div className="bg-green-500 p-4 mx-2 text-black my-5 w-1/2">Admin Added Successfully.</div>): null}
            {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5 w-1/2">Failed to add admin</div>): null}
            <form method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => addAdmin(e)}>
                <div className="mb-3">
                    <label className="block" htmlFor="name">Name:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="text" name="name" id="name" placeholder="Enter name..." value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="email">Email:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="email" name="email" id="email" placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block" htmlFor="password">Password:</label>
                    <input className="w-1/2 outline-none h-12 border border-black p-3 rounded-md" type="password" name="password" id="password" placeholder="Enter password..." value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button disabled={!name && !email && !password} className="bg-[#15eb5c] disabled:bg-[#6cf098] border border-black rounded-md w-1/2 h-12" type="submit">Add Admin User</button>
            </form>

            <div className="mt-8">
                <table className="table-fixed border-collapse border-spacing-2">
                    <thead className="bg-[#E4EB15]">
                        <tr className="">
                            <th className="p-4">No.</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Created By</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admins.map(admin => {
                                no++

                                return (
                                    <tr key={admin.id}>
                                        <td className="p-4">{no}</td>
                                        <td className="p-4">{admin.name}</td>
                                        <td className="p-4">{admin.email}</td>
                                        <td className="p-4">{admin.created_by}</td>
                                        <td className="p-4">{new Date(admin.created_at).toLocaleDateString("en-GB", options)}</td>
                                        <td className="p-4 flex align-middle"><Link href={`/cms/edit-admin/${admin.id}`} className="mr-3"><FaEdit color="#4b6dca" /></Link><span className="cursor-pointer" onClick={() => deleteAdmin(admin.id)}><FaTrash color="#f76186" /></span></td>
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