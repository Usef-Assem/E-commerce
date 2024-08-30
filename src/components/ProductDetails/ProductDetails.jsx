import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import toast from "react-hot-toast";
import {Helmet} from "react-helmet";


export default function ProductDetails() {

  let {addTOCart} = useContext(CartContext)

  async function addProduct(ProductId){
    let Response = await addTOCart(ProductId);
    console.log(Response);
    if(Response.data.status === 'success' , {
        duration: 2000,
    }){
        toast.success('Product added succesfully')
    }
    else{
        toast.error('Error Adding Product')
    }
}

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  let params = useParams()
  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let {isLoading , data , isError , isFetching} = useQuery('productDetails' , ()=>getProductDetails(params.id))
  return ( 
    
        <div className="row  align-items-center">
          <div className="col-md-4">
          <div>
        <Slider {...settings}>
          {data?.data.data.images.map((img)=>{
            return <img key={img} className='w-100' src={img} alt={data?.data.data.title} />
          })}
        </Slider>
      </div>
    ;
             <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
            </Helmet>
          </div>
          <div className="col-md-8">
              <h1 className='h4'>{data?.data.data.title}</h1>
              <p>{data?.data.data.description}</p>
              <h6 className='text-main'>{data?.data.data.category.name}</h6>
              <h4 className='text-main'> Price : {data?.data.data.price} EGP</h4>
              <div className='d-flex justify-content-between align-items-center'>
                <span> Ratings Quantity : {data?.data.data.ratingsQuantity}</span>
                <span> <i className="fa-solid fa-star"  style={{ color: "#adea2a" }}></i> {data?.data.data.ratingsAverage}</span>
              </div>
              <button onClick={()=>addProduct(data?.data.data._id)} className='w-100 btn bg-main text-white mt-3  py-2'>Add to cart</button>
          </div>
        </div>
    )
}
