import React from "react"
import notFoundImage from '../NotFound/error.svg'

export default function NotFound(){

    return (
        <div className='text-center my-5'>
            <img className='w-50 py-5' src={notFoundImage} alt="" />
        </div>
    )
}