import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios, { Axios } from "axios";
import { useParams } from "react-router-dom";

export default function Address(){

    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {cartId} = useParams()

    const validationSchema = Yup.object({
        details: Yup.string().required("Details is required"),
        city: Yup.string().required("City is required"),
        phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            details:'',
            city:'',
            phone:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            try {
                setIsLoading(true)
                const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{
                    shippingAddress: values
                }, {
                    headers:{
                        token: localStorage.getItem('token')
                    },
                    params:{
                        url:'http://localhost:3000'
                    }
                })
                
                // console.log(data.session.url)
                window.open(data.session.url, '_self')
                
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
            setIsLoading(false)
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Enter Shipping Address:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label htmlFor="details" className="mb-1">Details</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.details} type="text" className="form-control" id="details" placeholder="Enter details"/>
                    {errors.details && touched.details && <div className="alert alert-danger mt-2" role="alert">{errors.details}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="city" className="mb-1">City</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.city} type="text" className="form-control" id="city" placeholder="Enter name"/>
                    {errors.city && touched.city && <div className="alert alert-danger mt-2" role="alert">{errors.city}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="phone" className="mb-1">Phone</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.phone} type="tel" className="form-control" id="phone" placeholder="Phone"/>
                    {errors.phone && touched.phone && <div className="alert alert-danger mt-2" role="alert">{errors.phone}</div>}
                </div>

                {errorMsg && <div className="alert alert-danger mt-3" role="alert">{errorMsg}</div>} 

                <div className="button-container d-flex justify-content-end">
                    {isLoading ?
                    <button disabled type="submit" className="btn btn-success mt-3 mb-5"><i className="fa-solid fa-spin fa-spinner px-3"></i></button>
                    :
                    <button type="submit" disabled={!isValid || isLoading} className="btn btn-success mt-3 mb-5 ms-2">Checkout</button>
                    }
                </div> 
                
            </form>
        </div>
    )
}