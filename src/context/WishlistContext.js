import axios from "axios";
import { createContext } from "react";
import Wishlist from "../components/WishList/Wishlist";

export let wishlistContext = createContext()

function addProductToWishlist(id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        productId : id
    } , 
    {headers:{
        token: localStorage.getItem('userToken')
    }}
    )
}

function removeProductFromWishlist(id){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
        headers:{
            token: localStorage.getItem('userToken')
        }
    }).then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
}

function getLoggedUserWishlist(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers:{
            token: localStorage.getItem('userToken')
        }
    })
}
export default function WishlistContextProvider(props){
    return <>
    <wishlistContext.Provider value={{addProductToWishlist , removeProductFromWishlist , getLoggedUserWishlist}}>
        {props.children}
    </wishlistContext.Provider>
    </>
}