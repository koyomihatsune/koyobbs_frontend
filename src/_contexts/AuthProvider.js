import React, {createContext, useEffect, useState} from "react";


export const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [auth, setAuth] = useState({})
    const [isLogin, setIsLogin] = useState(false)
    const [page, setPage] = useState(1)

    return (
        <AuthContext.Provider value={{auth, setAuth, isLogin, setIsLogin, page, setPage}}>
            {children}
        </AuthContext.Provider>
    )

}