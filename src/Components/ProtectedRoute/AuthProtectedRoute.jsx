import React from "react"
import { authContext } from "../../Contexts/AuthContext"
import { useContext } from "react"
import Home from "../Home/Home"
import { Navigate } from "react-router-dom"


export default function AuthProtectedRoute({children}){
    const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)
    return (
        <>
            {userIsLoggedIn ? <Navigate to={'/home'}/> : children}
        </>
    )
}