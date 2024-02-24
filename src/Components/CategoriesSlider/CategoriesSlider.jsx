import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "react-query"

export default function CategoriesSlider(){

    function getAllCategories(){
        return axios.get('https://route-ecommerce.onrender.com/api/v1/categories')
    }

    const {data, isLoading} = useQuery('categories', getAllCategories,{
        cacheTime: 20000,
        staleTime: 5000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,

    })

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        arrows: false,
      };
   

    return (

        <>
        {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <Slider {...settings}>
            {data?.data.data.map((category, index) => {
                return <div key={index}>
                            <img style={{height: 200}} src={category.image} className="w-100"></img>
                            <h5>{category.name}</h5>
                        </div>
            })}
            </Slider>
            }
        </>
        
    )
}