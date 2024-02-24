import React from "react";
import { authContext } from "../../Contexts/AuthContext";
import { useContext } from "react";
import Login from "../Login/Login";

export default function ProtectedRoute({children}){
    const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)
    return (
        <>
            {userIsLoggedIn ? children : <Login/>}
        </>
    )
}