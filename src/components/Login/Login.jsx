import React, { useState } from "react";
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Puff } from  'react-loader-spinner'
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Login () {
    let {setUserToken} = useContext(UserContext)
    let navigate = useNavigate()
    const [error , setError] = useState("")
    const [isLoading , setisLoading] = useState(false)
    async function LoginSubmit(values){
        setisLoading(true);
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , values)
        .catch(
            (err) => {
                setisLoading(false)
                setError (err.response.data.message)
            }
            )
        if(data.message=== 'success')
        {        
        setisLoading(false)
        localStorage.setItem('userToken' , data.token)
        setUserToken(data.token)
        navigate('/Home')
        }
        
    }
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    let validateScheme = yup.object({
        email: yup.string().email('email is invalid').required('email is required'),
        password: yup.string().matches(passwordRegex , "password must start with uppercase and must contain numbers").required("password is required"),
    })
 
    let formik = useFormik({
        initialValues: {
            email : '' ,
            password : '',
        }, 
        validationSchema : validateScheme ,
        onSubmit : LoginSubmit
    })
    return <>
        <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        </Helmet>
        <div className=" w-100 mx-auto p-5">
            {error !== "" ?<div className="alert alert-danger">{error}</div>:''}
            <h2>Login now</h2>

            <form className="form-control border-0" onSubmit={formik.handleSubmit}>
                <div>
                <label className="mt-3" htmlFor="email">email : </label>
                <input className="form-control mt-2 w-100" type="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'email' value={formik.values.email} />
                {formik.errors.email && formik.touched.email? <div className="alert alert-danger mt-2 p-2">{formik.errors.email}</div> : ''}
                </div>


                <label className="mt-3" htmlFor="password">Password : </label>
                <input className="form-control mt-2" type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} id = 'password' value={formik.values.password} />
                {formik.errors.password && formik.touched.password? <div className="alert alert-danger mt-2 p-2">{formik.errors.password}</div> : ''}
                    <div className="d-flex justify-content-between align-items-center">
                    <div>     
                {isLoading?
                <button className="btn bg-main mt-3 text-white " type= "button">
                <Puff
                height="25"
                width="40"
                radius={1}
                color="#fff"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                /></button>
                :<button disabled={! (formik.isValid && formik.dirty)} className="btn bg-main mt-3 text-white " type="submit">Login</button>}
                    </div>
                    <div>
                        <Link to={'/ForgetPassword'}>Forget Password?</Link>
                    </div>
                    </div>
            </form>
        </div>
    </>;
}
