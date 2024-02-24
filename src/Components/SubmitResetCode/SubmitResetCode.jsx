import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { toast } from "react-toastify";

export default function SubmitResetCode(){
    
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        resetCode: Yup.string().required("Reset Code is required").matches(/^[0-9]+$/, "Must be only digits"),
    })

    const {values, handleSubmit, errors, handleChange, touched, handleBlur, isValid} = useFormik({
        initialValues:{
            resetCode:'',
        },

        onSubmit: async () => {
            setErrorMsg('')
            try {
                setIsLoading(true)
                const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
                // console.log(data)
                setIsLoading(false)
                toast.success(data.status, {
                    autoClose: 3000,
                    draggable: true,
                    })
                if(data.status == "Success"){
                    navigate('/resetpassword')
                }
            } catch (error) {
                setErrorMsg(error.response.data.message)
            }
        },

        validationSchema

    })

    return (
        <div className="container w-75 mt-5">
            <h2>Please enter verification code:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-4">
                    <input onChange={handleChange} onBlur={handleBlur} value={values.resetCode} type="text" className="form-control" id="resetCode" placeholder="Enter Reset Code"/>
                    {errors.resetCode && touched.resetCode && <div className="alert alert-danger mt-2" role="alert">{errors.resetCode}</div>}
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