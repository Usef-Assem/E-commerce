import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { CartContext } from "../../context/cartContext";
import { BallTriangle } from "react-loader-spinner";
import toast from "react-hot-toast";
import axios from "axios";

export default function Cart() {
  const [TotalCartPrice, setTotalCartPrice] = useState(0);
  const [CartDetails, setCartDetails] = useState([]);
  const { getLoggedUserCart, RemoveSpecificItem, UpdateCartProductQuantity } = useContext(CartContext);
  const queryClient = useQueryClient();

  // Fetch cart items using react-query
  const { data, refetch, isLoading, isError } = useQuery('cartItems', async () => {
    const response = await getLoggedUserCart();
    return response.data;
  });

  useEffect(() => {
    if (data) {
      setCartDetails(data);
      setTotalCartPrice(data?.data.totalCartPrice);
    }
  }, [data]);

  // Function to clear the cart
  async function clearCart() {
    try {
      await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: { token: localStorage.getItem('userToken') }
      });
      toast.success('Cart cleared successfully');
      refetch();  // Refetch the cart data after clearing
    } catch (err) {
      console.log(err);
      toast.error('Failed to clear cart');
    }
  }

  // Optimistically remove an item from the cart
  async function removeItem(id) {
    const previousCartDetails = CartDetails; // Store the previous cart state

    // Optimistically update the UI
    setCartDetails((prevDetails) => {
      const updatedProducts = prevDetails.data.products.filter(product => product.product._id !== id); // Remove the item optimistically
      return { ...prevDetails, data: { ...prevDetails.data, products: updatedProducts } };
    });

    try {
      await RemoveSpecificItem(id);
      toast.success('Product removed successfully');
      refetch();  // Refetch the cart data after removing an item
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove product');
      setCartDetails(previousCartDetails); // Revert to previous state on error
    }
  }

  // Optimistically update product quantity
  async function UpdateProductQuantity(id, count) {
    const previousCartDetails = CartDetails; // Store the previous cart state

    // Optimistically update the UI
    setCartDetails((prevDetails) => {
      const updatedProducts = prevDetails.data.products.map((product) => {
        if (product.product._id === id) {
          return { ...product, count }; // Update the count optimistically
        }
        return product;
      });
      return { ...prevDetails, data: { ...prevDetails.data, products: updatedProducts } };
    });

    try {
      await UpdateCartProductQuantity(id, count);
      refetch();  // Refetch the cart data after updating the quantity
    } catch (err) {
      console.log(err);
      toast.error('Failed to update product quantity');
      setCartDetails(previousCartDetails); // Revert to previous state on error
    }
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) return <div>Error fetching cart data</div>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>

      {CartDetails ? (
        <div className="w-100 mx-auto bg-main-light p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-md-8 col-sm-8 D-width">
              <h2 className="text-main">Shop Cart</h2>
              <h2 className="h5 text-main price-width">Total Cart Price: {TotalCartPrice} EGP</h2>
            </div>
            <div className="col-md-4 col-sm-4 w-25 d-flex">
              <button className="btn bg-main text-white ms-auto" onClick={clearCart}>Clear cart</button>
            </div>
          </div>
          {CartDetails?.data?.products.map((product) => (
            <div key={product.product._id} className="row">
              <div className="col-md-2 py-2">
                <img className="w-100" src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-10 col-sm-10 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mt-2 w-75 py-3 col-md-9 col-sm-2">
                    <h2 className="h6 w-75">{product.product.title}</h2>
                    <h2 className="h6 text-main">Price: {product.price} EGP</h2>
                    <button onClick={() => removeItem(product.product._id)} className="btn p-0 text-danger">
                      <i className="text-danger fas fa-trash-can"></i> Remove
                    </button>
                  </div>
                  <div className="d-flex align-items-center">
                    <button onClick={() => UpdateProductQuantity(product.product._id, product.count + 1)} className="btn border-main p-1">+</button>
                    <span className="mx-2">{product.count}</span>
                    <button onClick={() => UpdateProductQuantity(product.product._id, product.count - 1)} className="btn border-main p-1">-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-md-4 col-sm-12">
            <Link className='bg-main btn-width mx-2 btn mt-3 text-white' to={'/Address/' + CartDetails?.data?._id}>Check Out</Link>
            <Link className='bg-main btn-width mx-2 btn mt-3 text-white' to={'/Delivery/' + CartDetails?.data?._id}>Cash on Delivery</Link>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-4 align-items-center">
          <h2>Your cart is empty</h2>
        </div>
      )}
    </>
  );
}
