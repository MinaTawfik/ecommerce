import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext";
import { useState } from "react";

export default function Product({product}){

    const {setCartNo} = useContext(cartContext)
    const [wishlistProducts, setWishlistProducts] = useState([])

    async function getWishlistProducts(){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers:{
                token: localStorage.getItem('token')
            }
        })
        setWishlistProducts(data?.data)
    }

    async function addProductToCart(productId){
        const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart', {
            productId
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        setCartNo(data)
        toast.success(data.message, {
            autoClose: 3000,
            draggable: true,
            })
        // console.log(data)
    }

    async function addProductToWishlist(productId){
        const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/wishlist', {
            productId
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        toast.success(data.message, {
            autoClose: 3000,
            draggable: true,
            })
        // console.log(data)
    }

    async function removeProductToWishlist(productId){
        const {data} = await axios.delete('https://route-ecommerce.onrender.com/api/v1/wishlist/' + productId, {
            headers: {
                token: localStorage.getItem('token')
            }
        })
        toast.success(data.message, {
            autoClose: 3000,
            draggable: true,
            })
        // console.log(data)
    }

    useEffect(()=>{
        getWishlistProducts()
    })

    var isWished = 0

    return (
            <div className="product overflow-hidden px-2 py-3 cursor-pointer">
                <Link to={'/productdetails/' + product.id} className='a'>
                    <img className='w-100' src={product.imageCover} alt="" />
                    <h5 className='font-sm text-main'>{product.category.name}</h5>
                    <p className='d-flex justify-content-between'>
                    <h4>{product.title.split(" ").slice(0, 2).join(" ")}</h4>
                    {wishlistProducts?.map((wishProduct) => {
                        if(product.id == wishProduct.id){
                            isWished++  
                        }
                    })}
                    {isWished == 1 ? 
                            <Link to={''}>
                                <i onClick={() => {removeProductToWishlist(product.id)}} className="fa-solid fa-heart me-1 fs-3 text-danger">
                            </i></Link> 
                            : 
                            <Link to={''}>
                                <i onClick={() => {addProductToWishlist(product.id)}} className="fa-solid fa-heart me-1 fs-3"></i>
                            </Link>}
                    </p>
                    <p className='d-flex justify-content-between'>
                        <span >{product.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            {product.ratingsAverage}
                        </span>
                    </p>
                </Link>
                <button onClick={() => {addProductToCart(product.id)}} className='btn bg-main text-white w-100'>+Add To Cart</button>
            </div>
    )
}