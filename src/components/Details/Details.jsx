import React, { useContext, useEffect, useState } from "react";
import "./Details.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function Details() {
  const BaseUrl = "https://ecommerce.routemisr.com";
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay : true 
  };
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let params = useParams();
  let { addToCart ,  setNumOfCartItems} = useContext(cartContext);

  async function getProductDetails(id) {
    let { data } = await axios.get(`${BaseUrl}/api/v1/products/${id}`);
    setDetails(data.data);
    setIsLoading(false);
  }
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == 'success') {
      toast.success('Product add successfully')
      setNumOfCartItems(res.data.numOfCartItems)
    } else {
      toast.error('Failed to add product ')
    }
  }

  useEffect(() => {
    getProductDetails(params.id);
  }, []);
  return (
    <>
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product-Details</title>
      </Helmet>
      </>
      <div className="container p-5 ">
        {isLoading ? (
          <ThreeCircles
            height="80vh"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="justify-content-center"
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        ) : (
          <div className="row align-items-center">
            <div className="col-md-4">
                <Slider {...settings}>
                  {details.images.map((product , index) => <img key={index} src={product}/>)}
              </Slider>
            </div>
            <div className="col-md-8">
              <h2>{details.title}</h2>
              <p>{details.description}</p>
              <p>{details.category.name}</p>
              <div className="d-flex justify-content-between">
                <h5>{details.price} EGP</h5>
                <h5>
                  <i className="fa fa-star rating-color"></i>{" "}
                  {details.ratingsAverage}
                </h5>
              </div>
                <button
                   onClick={ () => addCart(details.id)}
                  className="btn bg-main w-100 text-white">
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
