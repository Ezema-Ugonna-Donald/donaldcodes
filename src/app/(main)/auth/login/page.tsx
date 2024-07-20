"use client"

import { FormEvent, useState, useEffect } from "react";
import { FaAt, FaLock } from "react-icons/fa";
import axios from "@/app/(main)/api/axios";
import { useRouter } from "next/navigation";
import useAuth from "@/app/(main)/hooks/useAuth";

type User = {
    id: number
    name: string
    email: string
    password: string
    created_by: string
    created_at: string
}

const Login = () => {
    const { push } = useRouter()
    const [error, setError] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [user, setUser] = useState<User>({
        id: 0,
        name: "",
        email: "",
        password: "",
        created_by: "",
        created_at: ""
    }) 

    const LOGIN_URL: string = "/users/login"

    const { auth, setAuth } = useAuth()

    const adminLogin = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        try 
        {
            const response = await axios.post(LOGIN_URL, {
                email: email,
                password: password
            })

            if (response?.status === 200)
            {
                setError(false)
                
                setUser(response.data.user)

                // console.log(response.data.accessToken)
                const userId = user.id
                const email = user.email
                const name = user.name
                const token = response.data?.accessToken

                // console.log("loggg")
                
                // setAuth({ userId, email, name, token })
                // console.log("logged in")

                window.localStorage.setItem("token", response.data.accessToken)
                window.localStorage.setItem("user_id", user.id.toString())
                window.localStorage.setItem("email", user.email)
                window.localStorage.setItem("name", user.name)

                push("/cms")
            }
            else
            {
                setError(true)
            }
        } 
        catch (error) 
        {
            console.error(error)
        }
    }

    useEffect(() => {
        if (auth?.token !== undefined || window.localStorage.getItem("token") !== null)
        {
            push("/cms")
        }
    }, [])

    return (
        <section className="bg-black pb-24">
            <div className="m-auto mt-20 w-1/2 py-5 px-4 text-black bg-[#E4EB15]">
                <form method="post" onSubmit={(e: FormEvent<HTMLFormElement>) => adminLogin(e)}>
                    <div className="mb-5">
                        <h1 className="text-xl">Login</h1>
                        <h2>Enter your Credentials</h2>
                    </div>
                    {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5">Incorrect username/password</div>): null}
                    <div className="p-4 mx-2 bg-[#ec0b43]">
                        <div className="w-full mb-2">
                            <label htmlFor="email" className="text-left block text-white">Email: </label>
                            <div className="bg-white rounded-md border-solid flex border-black">
                                <span className="p-3 pt-3.5 inline"><FaAt /></span>
                                <input className="w-[90%] outline-none border-none h-11 placeholder:text-[#413b40]" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="Enter email..." />
                            </div>
                        </div>
                        <div className="w-full mb-2">
                            <label htmlFor="password" className="text-left block text-white">Password: </label>
                            <div className="bg-white rounded-md border-solid flex border-black">
                                <span className="p-3 pt-3.5 inline"><FaLock /></span>
                                <input className="w-[90%] outline-none border-none h-11 placeholder:text-[#413b40]" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Enter password..." />
                            </div>
                        </div>
                        <div>
                            <button disabled={!email && !password} className="w-full p-3 disabled:bg-slate-700 bg-black text-white rounded-md transition-colors delay-150 hover:bg-slate-900" type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login