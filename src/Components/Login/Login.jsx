import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { authContext } from "../../Contexts/AuthContext";

export default function Login(){

    const {userIsLoggedIn, setUserIsLoggedIn} = useContext(authContext)
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Enter valid email"),
        password: Yup.string().required("Password is required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/, "Password must contain special character, number and more than 8 characters and less than 18 characters"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            email:'',
            password:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            try {
                setIsLoading(true)
                let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
                // console.log(data.message)
                if(data.message=='success'){
                    setUserIsLoggedIn(true)
                    localStorage.setItem('token', data.token)
                    if(window.location.pathname == '/login'){
                        navigate('/home')
                    } else {
                        navigate(window.location.pathname)
                    }
                }
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
            setIsLoading(false)
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Login Now:</h2>
            <form onSubmit={handleSubmit}>
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
                    <Link to={'/forgetpassword'} className="fw-bold">Forget Password?</Link>
                </div>

                {errorMsg && <div className="alert alert-danger mt-3" role="alert">{errorMsg}</div>} 

                <div className="button-container d-flex justify-content-end">
                    {isLoading ?
                    <button disabled type="submit" className="btn btn-success mt-3 mb-5"><i className="fa-solid fa-spin fa-spinner px-3"></i></button>
                    :
                    <button type="submit" disabled={!isValid || isLoading} className="btn btn-success mt-3 mb-5 ms-2">Login</button>
                    }
                </div> 
                
            </form>
        </div>
    )
}