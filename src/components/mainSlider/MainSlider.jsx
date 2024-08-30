import React from 'react'
import Slider from "react-slick";
import slide1 from '../../Assets/images/grocery-banner.png'
import slide2 from '../../Assets/images/slider-image-3.jpeg'
import slide3 from '../../Assets/images/slider-image-2.jpeg'
import blog1 from '../../Assets/images/grocery-banner-2.jpeg'
import blog2 from '../../Assets/images/blog-img-1.jpeg'
export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 4000,
        

      };
  return (
    <div className="row gx-0">
        <div className="col-md-9 col-sm-9 col-8">
        <Slider {...settings}>
          <img height={400} className='w-100' src={slide1} alt="" />
          <img height={400} className='w-100' src={slide2} alt="" />
          <img height={400} className='w-100' src={slide3} alt="" />
        </Slider>
        </div>
      <div className="col-md-3 col-sm-3 col-4">
        <img height={200} className='w-100' src={blog1} alt="" />
        <img height={200} className='w-100' src={blog2} alt="" />
      </div>
        </div>
   
  )
}
