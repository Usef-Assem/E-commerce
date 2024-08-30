import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Helmet } from 'react-helmet';



export default function ForgetPassword() {
    const [Error, setError] = useState('')
    let navigate = useNavigate()
let validationSchema = yup.object({
    email: yup.string().required("email is required").email('enter a valid email')
})
    let forgetForm = useFormik({
        initialValues: {
            email :""
        } , validationSchema ,
        onSubmit: SendtoApi
    })

        async function SendtoApi(val){
        let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords' , val).catch((err)=>{console.log(err);})
        console.log(data);
        {if(data.statusMsg == 'success'){
            document.getElementById('verifyForm').classList.remove('d-none')
            document.getElementById('forgetForm').classList.add('d-none')
        }}
    }



    let validationSchema2 = yup.object({
        resetCode: yup.string().required('code is Required').matches(/^[0-9]+$/ , 'must be 6 digits')
    })
    let verifyForm = useFormik({
        initialValues: {
            resetCode: ''
        } , validationSchema :validationSchema2 ,
        onSubmit: SendVerification
    })

        async function SendVerification(val){
            let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode' , val).catch((err)=>{console.log( 
            err.response.data.message)
            setError(err.response.data.message)
        })
            console.log(data);
            if(data?.status === 'Success'){
            navigate('/setNewPassword')
            }
            else{navigate('/ForgetPassword')}
        }

  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Forget Password</title>
    </Helmet>
    <div className='mt-5'>
    <form id='forgetForm' onSubmit={forgetForm.handleSubmit}>
        <label className='fw-bolder px-1' htmlFor="email">Enter Email :</label>
        <input onChange={forgetForm.handleChange} onBlur={forgetForm.handleBlur} className='form-control w-100 mt-2' type="email" name='email' id='email' placeholder='Enter here...' />
        {forgetForm.touched.email ? <p className='text-danger fs-5 '>{forgetForm.errors.email}</p> : ''}
       <button type='submit' disabled={!(forgetForm.isValid && forgetForm.dirty)} className='btn btn-success mt-2 mx-1'>Send</button>
    </form>

    <form onSubmit={verifyForm.handleSubmit} id='verifyForm' className='d-none'>
        {Error? <div className='alert alert-danger'>{Error}</div> : ''}
        <label className='fw-bolder' htmlFor='reset'>Reset Code :</label>
        <input id='reset' name='resetCode' onChange={verifyForm.handleChange} onBlur={verifyForm.handleBlur} className='form-control mt-2' type="tel" placeholder='Enter Reset Code...' />
         {verifyForm.touched.resetCode? <p className='text-danger py-2 fs-5'>{verifyForm.errors.resetCode}</p> : ''}
        <button disabled={!(verifyForm.isValid && verifyForm.dirty)} type='submit' className='btn btn-danger mt-2'>Verify</button>
    </form>
    </div>
    </>
}

