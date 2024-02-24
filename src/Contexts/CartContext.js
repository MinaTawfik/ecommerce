import axios from "axios"
import { createContext, useEffect } from "react";
import { useState } from "react";


export const cartContext = createContext()

export default function CartContextProvider({children}){
    const [cartNo, setCartNo] = useState([])

    async function getLoggedInCartProducts(){
        try {
            const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('token')
            }
            })
            setCartNo(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getLoggedInCartProducts()
    }, [])

    return <cartContext.Provider value={{cartNo, setCartNo}}>
        {children}
    </cartContext.Provider>
}