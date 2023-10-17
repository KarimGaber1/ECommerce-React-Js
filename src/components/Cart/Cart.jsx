import React, { useContext, useEffect, useState } from "react";
import "./Cart.module.css";
import { cartContext } from "../../Context/CartContext";
import { ThreeCircles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";

export default function Cart() {
  let { getCart, deleteProductFromCart, updateProductQuantity, setNumOfCartItems } =
    useContext(cartContext);
  const [cartDetails, setCartDetails] = useState({});

  async function removeItem(id) {
    let { data } = await deleteProductFromCart(id);
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);
    if (data.status == 'success') {
      toast.success('Product removed from Cart');
    } else {
      toast.error('Failed to remove product from cart');
    }
  }
  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    setCartDetails(data);
    
  }

  async function getCartDetails() {
    let { data } = await getCart();
    setCartDetails(data);
    setNumOfCartItems(data.numOfCartItems);
  }
  useEffect(() => {
    getCartDetails();
  }, []);

  return (
    <>
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
      </>
      {cartDetails.data ? (
        <div className="container bg-main-light my-5 ">
          <div className=" mx-auto  p-5">
            <h1 className="mb-4">Cart Shop</h1>
            <div className="d-flex justify-content-between align-align-items-center ">
              <h3 className="h5">
                Total Price :{" "}
                <span className="text-main">
                  {cartDetails.data.totalCartPrice} EGP
                </span>
              </h3>
              <h3 className="h5">
                Total Cart Items :{" "}
                <span className="text-main">{cartDetails.numOfCartItems}</span>
              </h3>
            </div>
          </div>
          {cartDetails.data.products.map((ele) => (
            <div
              key={ele.product._id}
              className="row  py-2 border-bottom bg-main-light mx-auto "
            >
              <div className="col-md-1 ">
                <img
                  className="w-100"
                  src={ele.product.imageCover}
                  alt={ele.product.title}
                />
              </div>
              <div className="col-md-11">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left-side">
                    <h4>{ele.product.title}</h4>
                    <p>{ele.price} EGP</p>
                  </div>
                  <div className="right-side">
                    <button
                      onClick={()=> updateCount(ele.product._id , ele.count-1)}
                      className="btn btn-primary">-</button>
                    <span className="px-2"> {ele.count} </span>
                    <button
                      onClick={()=> updateCount(ele.product._id , ele.count+1)}
                      className="btn btn-primary">+</button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(ele.product._id)}
                  className="btn btn-outline-danger p-1"
                >
                  <i className="fa fa-trash-can "></i> Remove{" "}
                </button>
              </div>
            </div>
          ))}
          <Link className="btn bg-main w-100  my-3 text-white fw-bold" to={'/checkout'}>Check out</Link>
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
