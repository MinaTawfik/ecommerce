import axios, { Axios } from "axios"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { toast } from "react-toastify";

export default function Register(){

    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name must be more than 3 characters").max(20, "Name must be less than 20 characters"),
        email: Yup.string().required("Email is required").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Enter valid email"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/, "Password must contain special character, number and more than 8 characters and less than 18 characters"),
        rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')], "Password not matched"),
        phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid Egyptian phone number"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            try {
                setIsLoading(true)
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
                // console.log(data.message)
                if(data.message=='success'){
                    navigate('/login')
                }
                toast.success('Registered Successfully', {
                    autoClose: 3000,
                    draggable: true,
                    })
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
            setIsLoading(false)
            
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Register Now:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label htmlFor="name" className="mb-1">Name</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.name} type="text" className="form-control" id="name" placeholder="Enter name"/>
                    {errors.name && touched.name && <div className="alert alert-danger mt-2" role="alert">{errors.name}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="email" className="mb-1">Email address</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className="form-control" id="email" placeholder="Enter email"/>
                    {errors.email && touched.email && <div className="alert alert-danger mt-2" role="alert">{errors.email}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password" className="mb-1">Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className="form-control" id="password" placeholder="Password"/>
                    {errors.password && touched.password && <div className="alert alert-danger mt-2" role="alert">{errors.password}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="rePassword" className="mb-1">Re-Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" className="form-control" id="rePassword" placeholder="Re-Password"/>
                    {errors.rePassword && touched.rePassword && <div className="alert alert-danger mt-2" role="alert">{errors.rePassword}</div>}
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
                    <button type="submit" disabled={!isValid || isLoading} className="btn btn-success mt-3 mb-5 ms-2">Register</button>
                    }
                </div> 
                
            </form>
        </div>
    )
}