import React from "react";
import "./Footer.module.css";
import appStore from '../../assets/images/appStore.svg'

export default function Footer() {
  return (
    <>
      <div className="container-fluid p-5 bg-main-light">
        <h3 className="fw-bold h4 pb-2">Get the Fresh Cart app</h3>
        <p>
          We Will send you a link , open it on your phone to download the app .
        </p>
        <div className="d-flex justify-content-around align-items-center border-bottom px-4 pb-3 ">
          <input
            className="form-control w-75 border-0 px-2  "
            type="email"
            placeholder="Email .."
          />
          <button className="btn bg-main text-white fw-bold px-4" type="submit">
            {" "}
            Share App Link
          </button>
        </div>
        <div className="d-flex py-4 justify-content-between align-items-center border-bottom">
          <div>
            {" "}
            <span className="fw-bold">Payment Partners</span>
            <i className=" fs-5 fa-brands fa-amazon-pay mx-2 "></i>
            <i className=" fs-5 fa-brands fa-cc-amex mx-2"></i>
            <i className="fs-5 fa-brands fa-cc-mastercard mx-2"></i>
            <i className="fs-5 fa-brands fa-paypal mx-2l"></i>
          </div>

          <div>
            <span className="fw-bold">Get deliveries with FreshCart</span>
            <img width={153} height={45} src={appStore} alt="" />
            <img  alt="Legible badge" src="https://lh3.googleusercontent.com/RyLoNcOmb91IxHIP9NWfC82chbsCsT-5R25efns1FmuM8xz6znE4CRjIEBosZ1FH2xG1UqH6Axyp-vPFnm4sazbrsaB-S0QT_cN9uWU9UKoSQYCjYQ=s0"/>
          </div>
        </div>
      </div>
    </>
  );
}
