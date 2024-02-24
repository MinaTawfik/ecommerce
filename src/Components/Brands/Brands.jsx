import React from "react"
import { useQuery } from "react-query"
import axios, { Axios } from "axios"

export default function Brands(){

    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }

    const {data, isLoading} = useQuery('brands', getAllBrands,{
        cacheTime: 20000,
        staleTime: 5000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,

    })
    console.log(data?.data.data)


    return (
        <>
            {isLoading ? <div className='d-flex align-items-center justify-content-center my-5 py-5'>
                <i className='fas fa-spin fa-spinner fa-2x'></i>
            </div>
            :
            <div className="row mt-4">
            {data?.data.data.map((brand) => {
                return <div key={brand._id} className="col-md-3" >
                        <div className="product overflow-hidden px-2 py-3 cursor-pointer">
                            <a className='a'>
                                <img className='w-100' style={{height: 300}} src={brand.image} alt="" />
                                <h4 className='text-main text-center mt-3'>{brand.name}</h4>
                            </a>
                        </div>
                        </div>
            })}
            </div>
            }
            
        </>
        
    )
}