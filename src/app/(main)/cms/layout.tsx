
"use client"
import SideNav from "@/app/(main)/components/cms/sidenav"
import CMSNavbar from "@/app/(main)/components/cms/navbar"
import PersistLogin from "@/app/(main)/context/PersistLogin"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/app/(main)/context/AuthProvider"

export default function CMSLayout({
    children
} : {
    children : React.ReactNode
}) {
    const { push } = useRouter()

    const [sideNavIsVisible, setSideNavIsVisible] = useState<boolean>(true)

    const [value, setValue] = useState<string>("")

    // const jwtToken = sessionStorage.getItem("token")

    const handleSetSideNav = () => {
        setSideNavIsVisible(!sideNavIsVisible)
    }

    useEffect(() => {
        // setValue(sessionStorage.getItem("token")!)

        // const navi = () => {
        //     if (value === "" || value === null)
        //         push("/")
        // }

        // navi()
    }, [])
    
    return (
        // {
            <AuthProvider>
                <PersistLogin>
                    <section className="bg-white h-screen grid grid-cols-4 grid-rows-[0.15fr,1.5fr,0.1fr,0.001fr] overflow-hidden">
                        <nav className="col-span-4 bg-[#ec0b43]"><CMSNavbar handleSetSideNav={handleSetSideNav}/></nav>
                        {
                            sideNavIsVisible ?
                            (
                                <div className="row-span-3 bg-black text-white"><SideNav /></div>
                            ) : null
                        }
                        <main className={sideNavIsVisible ? "col-span-3 overflow-scroll" : "col-span-4"}>{children}</main>
                        <footer className={sideNavIsVisible ? "col-span-3 w-full h-full p-3 bg-[#6B7400]": "col-span-4 w-full h-full p-3 bg-[#6B7400]"}>&copy; Copyright, All rights Reserved. {new Date().getFullYear()}</footer>
                    </section>
                </PersistLogin>
            </AuthProvider>
        // }
    )   
}