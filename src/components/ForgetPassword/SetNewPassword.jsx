import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function SetNewPassword() {
    let nav = useNavigate()
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    let validationSchema = yup.object({
        email: yup.string().email('email is invalid').required('email is required'),
        newPassword: yup.string().matches(passwordRegex , "password must start with uppercase and must contain numbers").required("password is required"),
        })
    let ResetPasswordForm = useFormik({
        initialValues:{
            email:"",
            newPassword :"",
        },validationSchema
        , onSubmit:ResetPassword
    })

        async function ResetPassword(val){
            let {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword' , val)            
            if(data.token){
                toast.success('success')
                }
                nav('/Login')
            }
  return (
    <form onSubmit={ResetPasswordForm.handleSubmit} className='mt-5'>
        <h2 className='text-center'>Reset Password</h2>
        <label htmlFor="email">email :</label>
        <input onChange={ResetPasswordForm.handleChange} onBlur={ResetPasswordForm.handleBlur} className='w-100 form-control mt-2' placeholder='Enter Email here...' type="email" id='email' name='email' />
        {ResetPasswordForm.touched.email ? <p className='text-danger fs-5 '>{ResetPasswordForm.errors.email}</p> : ''}
        <label className='mt-2' htmlFor="newPassword">newPassword :</label>
        <input onChange={ResetPasswordForm.handleChange} onBlur={ResetPasswordForm.handleBlur} className='form-control w-100 mt-2' type="password" placeholder='Enter New Password here...' id='newPassword' name='newPassword' />
        {ResetPasswordForm.touched.newPassword ? <p className='text-danger fs-5 '>{ResetPasswordForm.errors.newPassword}</p> : ''}
        <button disabled={!(ResetPasswordForm.isValid && ResetPasswordForm.dirty)} type='submit' className='btn btn-danger mt-2'>Verify</button>
    </form>
  )
}
