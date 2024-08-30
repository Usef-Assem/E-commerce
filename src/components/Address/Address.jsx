import React, { createContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from "../../context/cartContext";
import { Helmet } from 'react-helmet'
export default function Address() {
    let {id} = useParams()
    let{CheckPayment} = useContext(CartContext)
    let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    let validateScheme = yup.object({
        details : yup.string().required('This field is required'),
        phone : yup.string().required('Phone number is Invalid').matches(phoneRegex),
        city : yup.string().required('This field is required')
    })
       async function handleAddressSubmit(values){
            let {data} = await CheckPayment(values , id )
            console.log(data.session.url);
            if(data?.status === 'success'){
                window.location.href = data?.session.url
            }
        }
    let shippingForm = useFormik({
        initialValues : {
            details: '',
            phone: '',
            city: ''
        }, onSubmit: handleAddressSubmit
        , validationSchema:validateScheme
    })

  return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Delivery</title>
    </Helmet>
    <form onSubmit={shippingForm.handleSubmit}>
        <label htmlFor="details">Address:</label>
        <input value={shippingForm.values.details} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="text" name='details' id='details' className='form-control' />
        {shippingForm.errors.details && shippingForm.touched.details? <div className="alert alert-danger mt-2 p-2">{shippingForm.errors.details}</div> : ''}

        <label htmlFor="phone">Phone :</label>
        <input value={shippingForm.values.phone} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="tel" name='phone' id='phone' className='form-control' />
        {shippingForm.errors.phone && shippingForm.touched.phone? <div className="alert alert-danger mt-2 p-2">{shippingForm.errors.phone}</div> : ''}

        <label htmlFor="city">City :</label>
        <input value={shippingForm.values.city} onChange={shippingForm.handleChange} onBlur={shippingForm.handleBlur} type="text" name='city' id='city' className='form-control' />
        {shippingForm.errors.city && shippingForm.touched.city? <div className="alert alert-danger mt-2 p-2">{shippingForm.errors.city}</div> : ''}
        
        <button disabled={ !(shippingForm.isValid && shippingForm.dirty)} className="btn bg-main mt-3 text-white " type="submit">Pay Now</button>
    </form>
    </>
}
