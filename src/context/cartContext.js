import { createContext , useState } from "react";
import axios from "axios";
export let CartContext = createContext()
function addTOCart(ProductId){
    try {
        return axios.post("https://ecommerce.routemisr.com/api/v1/cart",
        {
            productId : ProductId
        } ,
        
        {
            headers: {
                token: localStorage.getItem('userToken')
            }
            
        })
    } catch (error) {
     console.log(error);   
    }
  }

    function getLoggedUserCart(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart' , {
            headers : {
                token : localStorage.getItem('userToken')
            }
        }).then((response)=>response)
        .catch((error)=> error)
  }
  function RemoveSpecificItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }).then((response)=>response)
    .catch((error)=> error)
  }

  function UpdateCartProductQuantity(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        count 
    } ,
    {
        headers: {
            token: localStorage.getItem('userToken')
        }
    }).then((response)=>response)
    .catch((error)=> error)
  }

   function CheckPayment(shippingData , id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000` 
    ,{
        shippingAddress : shippingData
    } , {headers:{
        token: localStorage.getItem('userToken')
    }}
    )
  }

  function CashOnDelivery(shippingData , id){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}` 
    ,{
        shippingAddress : shippingData
    } , {headers:{
        token: localStorage.getItem('userToken')
    }}
    )
  }




export default function CartContextProvider(props){
        
    return <>
        <CartContext.Provider value={{addTOCart , getLoggedUserCart , RemoveSpecificItem , UpdateCartProductQuantity , CheckPayment , CashOnDelivery }} >
            {props.children}
        </CartContext.Provider>
    
    </>
}