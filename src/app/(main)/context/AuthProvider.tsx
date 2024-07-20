"use client"

import { createContext, useState } from "react"

const AuthContext = createContext<{
    auth: any
    setAuth: any
    persist: any
    setPersist: any
}>({
    auth: {},
    setAuth: {},
    persist: false,
    setPersist: {}
});

export function AuthProvider ({children}: any) {
    const [auth, setAuth] = useState<any>({});

    const [persist, setPersist] = useState(typeof window !== "undefined" ? window.localStorage.getItem("token")! : "" || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthContext;