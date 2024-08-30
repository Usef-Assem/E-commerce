import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { Discuss } from "react-loader-spinner";
import { useQuery } from "react-query";


export default function Category () {

    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let{data , isLoading} = useQuery('categoryRequest' , getAllCategories)
    console.log(data?.data.data);
    return <>
    <Helmet>
    <meta charSet="utf-8" />
    <title>Categories</title>
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
</div> :    <div className="container">
            <div className="row">
                {data?.data.data.map((category)=>{
                    return <> <div key={category._id} className="col-md-3 col-sm-6 mt-4">
                    <div className="card item">
                    <img className="w-100 img-radius" style={{height: "300px"}} src={category.image} alt="" />
                    <div className="card-body">
                        <h3 className="card-title text-center text-main">{category.name}</h3>
                    </div>
                    </div>
                    </div>
                    </>
                })}
            </div>
        </div>
    }
    </>;
}
