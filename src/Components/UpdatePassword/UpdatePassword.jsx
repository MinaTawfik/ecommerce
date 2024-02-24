import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { toast } from "react-toastify";

export default function UpdatePassword(){

    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/, "Password must contain special character, number and more than 8 characters and less than 18 characters"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/, "Password must contain special character, number and more than 8 characters and less than 18 characters"),
        rePassword: Yup.string().required("RePassword is required").oneOf([Yup.ref('password')], "Password not matched"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            currentPassword:'',
            password:'',
            rePassword:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            setIsLoading(true)
                let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',{
                    headers: {
                        token: localStorage.getItem('token')
                    }
                } , values)
                // console.log(data)
            setIsLoading(false)
            toast.success(data.status, {
                autoClose: 3000,
                draggable: true,
                })
            if(data.status == "success"){
                navigate('/login')
            }
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Please enter verification code:</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
                    <label htmlFor="currentPassword" className="mb-1">Current Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.currentPassword} type="currentPassword" className="form-control" id="currentPassword" placeholder="Current Password"/>
                    {errors.currentPassword && touched.currentPassword && <div className="alert alert-danger mt-2" role="alert">{errors.currentPassword}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="password" className="mb-1">New Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.password} type="password" className="form-control" id="password" placeholder="Password"/>
                    {errors.password && touched.password && <div className="alert alert-danger mt-2" role="alert">{errors.password}</div>}
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="rePassword" className="mb-1">Re-Password</label>
                    <input onChange={handleChange} onBlur={handleBlur} value={values.rePassword} type="password" className="form-control" id="rePassword" placeholder="Re-Password"/>
                    {errors.rePassword && touched.rePassword && <div className="alert alert-danger mt-2" role="alert">{errors.rePassword}</div>}
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