import React from "react";
import "./CategoriesSlider.module.css";
import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";

export default function CategoriesSlider() {
  const BaseUrl = "https://ecommerce.routemisr.com";
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
  };
  let { data } = useQuery("allCategories", getCategories);

  function getCategories() {
    return axios.get(`${BaseUrl}/api/v1/categories`);
  }
  return (
    <>
      <div className="container">
        <h2 className="h4">Shop Popular Categories</h2>
        <Slider {...settings}>
          {data?.data?.data.map((category) => (
            <>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-100"
                  height={250}
                />
                <h4 className="h6 p-2 text-center fw-bold">{category.name}</h4>
            </>
          ))}
        </Slider>
      </div>
    </>
  );
}
