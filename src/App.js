import {createBrowserRouter, createHashRouter, RouterProvider}from 'react-router-dom';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import { Children, useContext, useEffect } from 'react';
import UserContextProvider, { UserContext } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import Wishlist from './components/WishList/Wishlist';
import WishlistContextProvider from './context/WishlistContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import SetNewPassword from './components/ForgetPassword/SetNewPassword';
import Address from './components/Address/Address';
import Orders from './components/Orders/Orders';
import Delivery from './components/Address/Delivery';




let routers = createBrowserRouter([
  {path: '/' , element: <Layout/>, children:[
    {index: true , element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path: 'Home' , element:<ProtectedRoute> <Home/> </ProtectedRoute>},
    {path: 'Cart' , element: <ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path: 'Categories' , element: <ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path: 'Wishlist' , element: <ProtectedRoute> <Wishlist/> </ProtectedRoute>},
    {path: 'Login' , element: <Login/>},
    {path: 'Products' , element: <ProtectedRoute> <Products/> </ProtectedRoute>},
    {path: 'ProductDetails/:id' , element: <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path: 'Brands' , element: <ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path: 'Address/:id' , element: <ProtectedRoute> <Address/> </ProtectedRoute>},
    {path: 'Delivery/:id' , element: <ProtectedRoute> <Delivery/> </ProtectedRoute>},
    {path: 'allorders' , element: <ProtectedRoute> <Orders/> </ProtectedRoute>},
    {path: 'ForgetPassword' , element: <ForgetPassword/>},
    {path: 'SetNewPassword' , element: <SetNewPassword/>},
    {path: 'Register' , element: <Register/>},

    {path: '*' , element: <Notfound/>},
  ] },
])
export default function App () {
  let {setUserToken} = useContext(UserContext)
  useEffect(()=>{
      if(localStorage.getItem('userToken') !== null){
          setUserToken(localStorage.getItem('userToken'))
      }
  } , []);
  return <>
  <WishlistContextProvider>
  <CartContextProvider> 
  <RouterProvider router={routers}></RouterProvider>
  <Toaster />
  </CartContextProvider>
  </WishlistContextProvider>
  </>
  ;
}

