import React, { useContext, useEffect, useState } from "react";
import "./Categories.module.css";
import { cartContext } from "../../Context/CartContext";
import { ThreeCircles } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Categories() {
  let { getCategory } = useContext(cartContext);
  const [categoryDetails, setCategoryDetails] = useState({});

  async function getCategoryDetails() {
    let { data } = await getCategory();
    setCategoryDetails(data);
  }
  useEffect(() => {
    getCategoryDetails();
  }, []);

  return (
    <>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Categories</title>
        </Helmet>
      </>
      {categoryDetails.data ? (
        <div className="container p-5">
          <div className="row">
            {categoryDetails.data?.map((category) => (
              <div key={category._id} className="col-4 text-center p-2  ">
                <div className="card">
                  <div className="card-img-top">
                    <img
                      className="w-100 "
                      height={300}
                      src={category.image}
                      alt=""
                    />
                    <div className="card-body">
                      <p className="card-text text-success h3 text-center fw-bold">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
}
