import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "../CartProduct/CartProduct";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext";

export default function Cart(){

    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [timeOutId, setTimeOutId] = useState()
    const [cartId, setCartId] = useState()
    const {setCartNo} = useContext(cartContext)


    async function getLoggedInCartProducts(){
        try {
            const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('token')
            }
            })
            // console.log(data.data.products)
            setCart(data.data)
            setCartId(data.data._id)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    function removeProductFromCart(productId){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
          }).then(async(result) => {
            if (result.isConfirmed) {
                const {data} = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart/' + productId, {
                headers: {
                    token: localStorage.getItem('token')
                }
                })
                setCart(data.data)
                setCartNo(data)
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
              });
            }
          });

        
    }

    async function clearCart(){
        const {data} = await axios.delete('https://route-ecommerce.onrender.com/api/v1/cart', {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setCart(data.data)
        setCartNo(data)
    }


    useEffect(() => {
        getLoggedInCartProducts()
    }, [])

    function updateCartProductCount(productId, count){
        clearTimeout(timeOutId)
        setTimeOutId(setTimeout(async () => {
            if(count == 0){
                removeProductFromCart(productId)
            } else{
                const {data} = await axios.put('https://route-ecommerce.onrender.com/api/v1/cart/' + productId,{
                count
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setCart(data.data)
            }
        }, 500))
        
    }



    return (
        <>

            {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <>
            {cart?.products?.length > 0 ? 
                <div className='my-5'>
                    <button onClick={clearCart} className='btn btn-outline-danger d-block ms-auto'>Clear Cart</button>
        
                    {cart?.products?.map((cartProduct, index) => {
                        return <CartProduct updateCartProductCount={updateCartProductCount} removeProductFromCart={removeProductFromCart} key={index} cartProduct={cartProduct}/>
                    })}
        
                    <div className='d-flex justify-content-between'>
                        <Link to={'/address/' + cartId} className='btn bg-main text-white'>CheckOut</Link>
                        <p>Total cart Price: {cart?.totalCartPrice} EGP</p>
                    </div>
        
                </div>
                : 
                <h2 className='alert alert-warning text-center my-5'>No products in your cart</h2>
            }
            </>
            }  
    </>
    )
}