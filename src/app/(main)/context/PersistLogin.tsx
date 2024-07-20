// import { Outlet } from ""
import { useState, useEffect } from "react"
import useRefreshToken from "@/app/(main)/hooks/useRefreshToken"
import useAuth from "@/app/(main)/hooks/useAuth"
import Loader from "@/app/(main)/components/Loader"
import { redirect } from "next/navigation"

export default function PersistLogin({
    children
} : {
    children : React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const refresh = useRefreshToken()
    const [isPersisted, setPersisted] = useState<boolean>(false)
    const { auth, persist } = useAuth()

    // const { push } = useRouter()

    useEffect(() => {
        let isMounted = true
        if (!persist) redirect("/")

        const verifyRefreshToken = async () => {
            try
            {
                await refresh()
            }
            catch(error)
            {
                console.error(error)
            }
            finally
            {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false)

        return () => { isMounted = false }
    }, [persist])

    return (
        <>
            {
                !persist || persist === ""
                    ?  null
                    : isLoading
                        ? (<Loader />)
                        : children 
            }
        </>
    )
}