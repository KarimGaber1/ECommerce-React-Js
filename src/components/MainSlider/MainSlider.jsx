import React from 'react'
import './MainSlider.module.css'
import mainImg1 from '../../assets/images/slider-image-1.jpeg'
import mainImg2 from '../../assets/images/slider-image-2.jpeg'
import mainImg3 from '../../assets/images/slider-image-3.jpeg'
import blog1 from '../../assets/images/slider-2.jpeg'
import blog2 from '../../assets/images/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false
  };

  return (
    <>
      <div className="container my-5">
        <div className="row gx-0">
          <div className="col-md-9">
            <Slider {...settings}>
            <img height={300} src={mainImg3} alt="" className='w-100'/>
            <img height={300} src={mainImg1} alt="" className='w-100'/>
            <img height={300} src={mainImg2} alt="" className='w-100'/>
          </Slider>
          </div>
          <div className="col-md-3">
            <img height={150} src={blog1} alt="" className='w-100'/>
            <img height={150} src={blog2} alt="" className='w-100'/>
          </div>
        </div>
      </div>
    </>
  )
}
