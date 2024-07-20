import axios from "@/app/(main)/api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth()

    const refresh = async () => {
        const email = typeof window !== "undefined" ? window.localStorage.getItem("email") : ""
        const userId = typeof window !== "undefined" ? window.localStorage.getItem("user_id") : ""
        // console.log("email", email)
        const response = await axios.get(`/refresh?Email=${auth?.email === undefined ? email : auth?.email}&Id=${auth?.userId === undefined ? userId : auth?.userId}`, {

        })

        setAuth((prev: any) => {
            // console.log(JSON.stringify(prev))
            // console.log(response.data)
            return { 
                ...prev, 
                token: response.data.accessToken
            }
        })

        return response.data
    }

    return refresh
}

export default useRefreshToken