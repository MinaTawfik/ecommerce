import axios, { Axios } from "axios"
import React, { useEffect, useState } from "react"
import Product from "../Product/Product"
import Slider from "react-slick";
import simg1 from '../Home/grocery-banner.png'
import simg2 from '../Home/grocery-banner-2.jpeg'
import fimg1 from '../Home/slider-image-1.jpeg'
import fimg2 from '../Home/slider-image-3.jpeg'
import fimg3 from '../Home/slider-image-2.jpeg'
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { useQuery } from "react-query"


export default function Home(){

    function getAllProducts(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    const {data, isLoading} = useQuery('products', getAllProducts,{
        cacheTime: 20000,
        staleTime: 5000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,

    })
    // console.log(data)

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
            <header>
                <div className="row g-0">
                    <div className="col-md-10">
                    <Slider {...settings}>
                        <div>
                            <img src={simg1} className="w-100" alt="" />
                        </div>
                        <div>
                            <img src={simg2} className="w-100" alt="" />
                        </div>
                    </Slider>
                    </div>
                    <div className="col-md-2">
                        <img src={fimg1} className="w-100"></img>
                        <img src={fimg2} className="w-100"></img>
                        <img src={fimg3} className="w-100"></img>
                    </div>
                </div>
            </header>

            <CategoriesSlider/>
            
            {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <div className="row">
                {data?.data.data.map((product)=>{
                    return <div key={product.id} className="col-md-3" >
                        <Product product={product}/>
                    </div>
                })}
            </div>
            }
        </>
        
    )
}