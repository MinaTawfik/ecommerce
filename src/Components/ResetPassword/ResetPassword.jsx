import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { toast } from "react-toastify";

export default function ResetPassword(){
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Enter valid email"),
        newPassword: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/, "Password must contain special character, number and more than 8 characters and less than 18 characters"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            email:'',
            newPassword:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            try {
                setIsLoading(true)
                let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
                // console.log(data)
                localStorage.setItem('token', data.token)
                setIsLoading(false)
                toast.success('Password changed successfully', {
                    autoClose: 3000,
                    draggable: true,
                    })
                navigate('/home')
            } catch (error) {
                setErrorMsg(error.response.data.message)
            } 
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Please enter your email and new password:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                    <input onChange={handleChange} onBlur={handleBlur} value={values.email} type="email" className="form-control" id="email" placeholder="Enter email"/>
                    {errors.email && touched.email && <div className="alert alert-danger mt-2" role="alert">{errors.email}</div>}
                </div>
                <div className="form-group mt-3">
                    <input onChange={handleChange} onBlur={handleBlur} value={values.newPassword} type="password" className="form-control" id="newPassword" placeholder="Enter new password"/>
                    {errors.newPassword && touched.newPassword && <div className="alert alert-danger mt-2" role="alert">{errors.newPassword}</div>}
                </div>

                {errorMsg && <div className="alert alert-danger mt-3" role="alert">{errorMsg}</div>} 

                <div className="button-container d-flex justify-content-end">
                    {isLoading ?
                    <button disabled type="submit" className="btn btn-success mt-3 mb-5"><i className="fa-solid fa-spin fa-spinner px-3"></i></button>
                    :
                    <button type="submit" disabled={!isValid || isLoading} className="btn btn-success mt-3 mb-5 ms-2">Change Password</button>
                    }
                </div>
                
            </form>
        </div>
    )
}