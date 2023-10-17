import React, { useState } from "react";
import "./ForgetPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  let navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  async function handleSubmit(values) {
    let response = await axios.post(
      'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
      {
        email: values.email,
      }
    ).catch((err) => {
      setApiError(err.response.data.message);
      
    })

    if (response.data.statusMsg === "success") {
      navigate("/resetAccount");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("Email not valid ").required("Email is required"),
  });

  let formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container p-5 ">
        <h1 className="h3 fw-bold py-4">Please enter your verification code:</h1>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
            value={formik.values.email}
          />
           {formik.errors.email && formik.touched.email ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.email}</div>
            ) : null}
          <button type="submit" className="btn btn-outline-success mt-3">
            {" "}
            verify
          </button>
        </form>
      </div>
    </>
  );
}
