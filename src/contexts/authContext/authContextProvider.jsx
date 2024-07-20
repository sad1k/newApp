import React, { useCallback, useContext, useState } from "react"


const AuthContext = React.createContext(null)

export const AuthContextProvider = ({children, ...props}) =>{
    const context = useCreateAuthContext(props)
    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export function useAuthContext(){
    const context = useContext(AuthContext)
    if (!context) throw new Error("Use auth context within provider!")
    return context
}

export function useCreateAuthContext(props){
    const [isAuth, setIsAuth] = useState(props.isAuth || false)
    const [user, setUser] = useState(props.user || null)
    const [articles, setArticles] = useState(props.articles || null)
    

    const toggleIsAuth = useCallback((bool) => {
        setIsAuth(auth => bool)
    })

    const toggleSetUser = useCallback((user) => {
        setUser(() => user)
    })

    const toggleSetArticles = useCallback((articles) => {
        setArticles(articles)
    })



    return {
        isAuth,
        toggleIsAuth,
        user,
        toggleSetUser,
        articles,
        toggleSetArticles
    }
}