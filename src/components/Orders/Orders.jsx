import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { BallTriangle } from "react-loader-spinner";


const fetchUserOrders = async () => {
    const token = localStorage.getItem('userToken');
    const { id } = jwtDecode(token);
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    return data;
};

export default function Orders() {
    const { data: allOrders, isLoading, isError, error } = useQuery('userOrders', fetchUserOrders);

    if (isLoading) return <div className="d-flex justify-content-center align-items-center">
    <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperClass={{}}
    wrapperStyle=""
    visible={true}
  />
  </div>;
    if (isError) return <div className="w-75 mx-auto py-5 text-danger">Error fetching orders: {error.message}</div>;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
            </Helmet>
            <div className='w-75 mx-auto bg-main-light p-5'>
                <h2>Your orders:</h2>
                {allOrders.length === 0 ? (
                    <div>No orders found.</div>
                ) : (
                    allOrders.map((item) => (
                        <div key={item.cartItems[0]._id} className="row border-bottom py-4">
                            <div className="col-md-2">
                                <img className='w-100' src={item.cartItems[0].product.imageCover} alt={item.cartItems[0].product.title} />
                            </div>
                            <div className="col-md-10 py-4">
                                <h2 className='text-main h3'>{item.cartItems[0].product.title}</h2>
                                {/* Uncomment if needed */}
                                {/* <h2 className='fw-bolder h6'>Brand: {item.cartItems[0].product.brand.name}</h2> */}
                                <h2 className='fw-bolder h6'>Is Delivered: {item.isDelivered ? 'Delivered' : 'Not Delivered'}</h2>
                                <h2 className='fw-bolder h6'>Price: {item.cartItems[0].price} EGP</h2>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
