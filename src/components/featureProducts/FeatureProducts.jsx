import React, { useContext, useState } from "react";
import "./FeatureProducts.module.css";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-hot-toast";

export default function FeatureProducts() {
  const BaseUrl = "https://ecommerce.routemisr.com";
  
  let { isLoading, data } = useQuery("featuredProducts", getProducts);
  let { addToCart, setNumOfCartItems, addToWishlist } = useContext(cartContext);
  function getProducts() {
    return axios.get(`${BaseUrl}/api/v1/products`);
  }
  async function addCart(id) {
    let res = await addToCart(id);
    if (res.data.status == "success") {
      toast.success("Product add successfully");
      setNumOfCartItems(res.data.numOfCartItems);
    } else {
      toast.error("Failed to add product ");
    }
  }
  async function addToWishlistProduct(id) {
    let res = await addToWishlist(id);
    if (res.data.status == "success") {
      toast.success("Added to wishlist", { icon: "👏" });
    } else {
      toast.error("Failed");
    }
  }

  return (
    <>
      <section className="py-5">
        <div className="container">
          <h2>FeatureProducts</h2>
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
            <div className="row">
              {data?.data?.data.map((product) => (
                <div key={product.id} className="col-md-2 ">
                  <div className="product position-relative p-2">
                    <Link
                      className="text-dark text-decoration-none"
                      to={"/details/" + product.id}
                    >
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="img-fluid"
                      />
                      <h3 className="h6 fw-bold text-main mt-2 ">
                        {product.category.name}
                      </h3>
                      <h3 className="h6 fw-bold">
                        {product.title.slice(0, product.title.indexOf(" ", 10))}
                      </h3>
                      <h4 className="h6">
                        {product.priceAfterDiscount ? (
                          <>
                            <span className="text-danger me-2 text-decoration-line-through font-sm">
                              {" "}
                              {product.price} EGP
                            </span>
                            <span className="font-sm">
                              {product.priceAfterDiscount} EGP
                            </span>
                          </>
                        ) : (
                          <span className="font-sm"> {product.price} EGP</span>
                        )}
                      </h4>
                      <h4 className="position-absolute end-0 top-0 p-2 rating-bg font-sm">
                        {product.ratingsAverage}
                      </h4>
                    </Link>
                    <div className="d-flex justify-content-end align-items-center">
                      <button
                        className='border-0 bg-white '
                       
                        onClick={() => [
                          addToWishlistProduct(product.id),
                          
                        ]}
                      >
                        <span>
                            <i className="fa-solid fa-heart fs-3 heart-icon "  />
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={() => addCart(product.id)}
                      className="btn bg-main text-white w-100"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
