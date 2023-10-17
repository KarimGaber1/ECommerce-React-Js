import React, { useState } from "react";
import "./RestAccount.module.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RestAccount() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  async function handleSubmit(values) {
    let response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      {
        resetCode: values.code,
      }
    ).catch((err) => {
      setApiError(err.response.data.message);
      
    })

    if (response.data.status === "Success") {
      navigate("/resetPassword");
    }
  }

 

  let formik = useFormik({
    initialValues: { code: "" },
   
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container py-5">
        <h1 className="h3 fw-bold py-4">Reset your account password:</h1>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <input
            placeholder="Code"
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="code"
            value={formik.values.code}
          />
          <button type="submit" className="btn btn-outline-success mt-3">
            {" "}
            verify
          </button>
        </form>
      </div>
    </>
  );
}
