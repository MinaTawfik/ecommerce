import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useContext } from "react";
import { cartContext } from "../../Contexts/CartContext";


export default function ProductDetails() {
    const {id} = useParams()
    const [productDetails, setProductDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {setCartNo} = useContext(cartContext)

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

    async function getProductDetails(){
        const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + id)
        setProductDetails(data.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      };

    return (
        <>
            {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <div className='row align-items-center py-5' >
                <div className="col-md-3">
                    <Slider {...settings}>
                        {productDetails.images?.map((image, index) => {
                            return <div key={index}>
                                        <img src={image} className='w-100'></img>
                                    </div>
                        })}
                        
                    </Slider>

                </div>
                <div className="col-md-9">
                    <h2 className='mt-2'>{productDetails?.title}</h2>
                    <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
                    <p className='mt-2'>{productDetails?.description}</p>
                    <p className='d-flex justify-content-between mt-2'>
                        <span>{productDetails?.price} EGP</span>
                        <span>
                            <i className='fas fa-star rating-color me-1'></i>
                            <span>{productDetails?.ratingsAverage}</span>
                        </span>
                    </p>
                    <button onClick={() => {addProductToCart(id)}} className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>

                </div>

            </div>
            } 
        </>
    )
}