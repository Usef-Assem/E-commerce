import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Discuss } from "react-loader-spinner";
import { Helmet } from "react-helmet";


export default function Brands () {

    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    let{data , isLoading} = useQuery('brandsRequest' , getAllBrands)
    console.log(data?.data.data);
    return <> 
      <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
      </Helmet>
     {isLoading ? <div className="d-flex justify-content-center align-items-center">
        <Discuss
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div> :  <div className="container">
      <h1 className="text-center text-main py-4">All Brands</h1>
          <div className="row">
              {data?.data.data.map((brand)=>{
                return  <div key={brand._id} className="col-md-3 col-sm-6 mt-3">
                  <div className="card item">
                  <img className="w-100 img-radius" style={{height: "250px"}} src={brand.image} alt="" />
                  <div className="card-body">
                      <h3 className="card-title text-center text-main">{brand.name}</h3>
                  </div>
                  </div>
                  </div>
              })}
          </div>
      </div>}
       
    </>;
    }
