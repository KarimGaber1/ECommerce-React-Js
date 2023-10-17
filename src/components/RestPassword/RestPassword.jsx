import React from "react";
import "./RestPassword.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


export default function RestPassword() {
  let navigate = useNavigate();

  async function handleSubmit(values) {
    let response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        email: values.email,
        newPassword: values.password,
      }
    );
    if (response.statusText === "OK") {
      navigate("/");
    }
  }
  let validationSchema = Yup.object({
    email: Yup.string().email("Email not valid ").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "Password should start with capital")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div className="container py-5">
        <h1 className="h3 fw-bold py-4">Reset your account password:</h1>
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
          <input
            placeholder="password"
            type="password"
            className="form-control my-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
            value={formik.values.password}
          />
           {formik.errors.password && formik.touched.password ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.password}</div>
            ) : null}

          <button type="submit" className="btn btn-outline-success mt-3">
            {" "}
            Reset Password
          </button>
        </form>
      </div>
    </>
  );
}
