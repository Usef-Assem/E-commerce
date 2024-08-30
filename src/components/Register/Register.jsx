import React, { useState } from "react";
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FallingLines } from  'react-loader-spinner'
import { Helmet } from "react-helmet";
export default function Register () {
    let navigate = useNavigate()
    const [error , setError] = useState("")
    const [isLoading , setisLoading] = useState(false)
    async function RegisterSubmit(values){
        setisLoading(true);
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values)
        .catch(
            (err) => {
                setisLoading(false)
                setError (err.response.data.message)
            }
            )
        if(data.message=== 'success')
        {
        setisLoading(false)
        navigate('/login')
        }
        
    }
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    let validateScheme = yup.object({
        name: yup.string().min( 3 , 'name min length is 3').max( 10 , 'name max length is 10').required('name is required'),
        email: yup.string().email('email is invalid').required('email is required'),
        phone: yup.string().matches(phoneRegex , 'phone number is invalid').required('phone nuumber is required'),
        password: yup.string().matches(passwordRegex , "password must start with uppercase and must contain numbers").required("password is required"),
        rePassword: yup.string().oneOf([yup.ref('password')] , 'password and repassword are not matched').required("repassword is required")
    })
 
    let formik = useFormik({
        initialValues: {
            name : '' ,
            email : '' ,
            phone : '' ,
            password : '',
            rePassword : '' ,
        }, 
        validationSchema : validateScheme ,
        onSubmit : RegisterSubmit
    })
    return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        </Helmet>
        <div className="w-100 mx-auto p-5">
            {error !== "" ?<div className="alert alert-danger">{error}</div>:''}
            <h2>Register now</h2>

            <form className="form-control col-md-1 col-sm-1 border-0" onSubmit={formik.handleSubmit}>
                <label className="mt-2" htmlFor="name">Name : </label>
                <input className="form-control mt-2" type="text" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'name' value={formik.values.name} />
                {formik.errors.name && formik.touched.name? <div className="alert alert-danger mt-2 p-2">{formik.errors.name}</div> : ''}

                <label className="mt-3" htmlFor="email">email : </label>
                <input className="form-control mt-2" type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'email' value={formik.values.email} />
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}

                <label className="mt-3" htmlFor="Phone">Phone : </label>
                <input className="form-control mt-2" type="tel" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'Phone' value={formik.values.phone} />
                {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger mt-2 p-2">{formik.errors.phone}</div> : ''}

                <label className="mt-3" htmlFor="password">Password : </label>
                <input className="form-control mt-2" type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'password' value={formik.values.password} />
                {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}

                <label className="mt-3" htmlFor="rePassword">rePassword : </label>
                <input className="form-control mt-2" type="password" name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'rePassword' value={formik.values.rePassword} />
                {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger mt-2 p-2">{formik.errors.rePassword}</div> : ''}
                {isLoading?
                <button className="btn bg-main mt-3 text-white " type= "button">
                <FallingLines
                color="#ffffff"
                width="25"
                visible={true}
                ariaLabel='falling-lines-loading'
              /></button>
                :<button disabled={! (formik.isValid && formik.dirty)} className="btn bg-main mt-3 text-white " type="submit">Register</button>}
            </form>
        </div>
    </>;
}
