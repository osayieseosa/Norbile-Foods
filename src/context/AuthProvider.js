import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("auth"))){
            localStorage.setItem("auth",JSON.stringify({}))
        }
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext