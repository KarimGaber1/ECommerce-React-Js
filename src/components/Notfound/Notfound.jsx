import React from "react";
import "./Notfound.module.css";
import errorImage from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="container text-center">
        <div className="p-5 ">
        <img src={errorImage} alt="Page not found" />
        <h1 className="fw-bold py-2">Page not found</h1>
        <p className="fw-bold">Oops...The link you clicked may be broken or the page may have been removed. We're sorry.</p>
        </div>
      </div>
    </>
  );
}
