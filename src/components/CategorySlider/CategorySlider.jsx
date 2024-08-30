import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";
function CategorySlider() {

    function getAllCaregories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    let{data , isLoading , isError} = useQuery('CategoryRequest' , getAllCaregories)
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: false,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
        
        
      };
  return <>
  <h3 className='fw-bolder mt-3'>Popular Categories :</h3>
  {data?.data.data?  <div>
        <Slider {...settings}>
            {data?.data.data.map((category)=>{
                return <div key={category._id} className='mt-2'> 
                <img height={200}  className='w-100' src={category.image} alt="" />
                <h2 className='text-center h5 mt-2'>{category.name}</h2>
                </div>
            })}
        </Slider>
      </div> :''}
  </>
    
  
}

export default CategorySlider