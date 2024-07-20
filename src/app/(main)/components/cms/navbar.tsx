import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import useAuth from "@/app/(main)/hooks/useAuth";
import { redirect } from "next/navigation"

export default function CMSNavbar(props: {handleSetSideNav: () => void}) {
    const { setAuth } = useAuth()
    const logout = () => {
        setAuth({})

        window.localStorage.removeItem("email")
        window.localStorage.removeItem("user_id")
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("name")

        redirect("/auth/login")
    }

    return (
        <div className="grid grid-cols-6">
            <div className="ml-10 col-span-1" onClick={props.handleSetSideNav}><img src="/assets/icons/ug-menu.png" className=" cursor-pointer w-[5.5em] mt-[1rem] transition-[scale] delay-150 hover:scale-[1.23] hover:-translate-x-[20px]" /></div>
            <div className="col-span-4 pl-[400px]">
                    <Link href="/cms" title="home button" className="w-full" >
                        <img src="/assets/logo/donaldcodesLogo.jpg" alt="Donald Codes Logo" className="w-[53px] object-center mt-[6px] border rounded-full" />
                    </Link>               
            </div>
            <div className="mt-4 col-span-1 flex gap-2"><span className="align-top">Ugonna Ezema</span><span onClick={() => logout()} className="pt-1.5 cursor-pointer"><FaSignOutAlt size={16} /></span></div>
        </div>
    )
}