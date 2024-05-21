"use client"
import { NextPage } from "next";
import { useState } from "react";
import { FaAt, FaLock } from "react-icons/fa";

interface Props {}

const Login : NextPage = (props): JSX.Element => {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <section className="bg-black pb-24">
            <div className="m-auto mt-20 w-1/2 py-5 px-4 text-black bg-[#E4EB15]">
                <form>
                    <div className="mb-5">
                        <h1 className="text-xl">Login</h1>
                        <h2>Enter your Credentials</h2>
                    </div>
                    {error ? (<div className="bg-red-500 p-4 mx-2 text-black my-5">Failed to submit comment</div>): null}
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