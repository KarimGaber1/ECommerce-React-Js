import React, { useState } from "react";
import "./Register.module.css";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();

  async function register(values) {
    setApiError("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setIsLoading(false);
      });
    console.log(data);
    if (data.message == "success") {
      setIsLoading(false);
      navigate("/login");
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z]+$/, "Name must be character only")
      .max(15, "Name should be less than 15 character")
      .min(2, "Name should be more than 2 character")
      .required("Name is required"),
    email: Yup.string().email("Email not valid ").required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "Password should start with capital")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "RePassword not match")
      .required("RePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => register(values),
  });

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-3">Register Now :</h2>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="uEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="uEmail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="uPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="uPassword"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="bg-warning ps-2 my-2">
                {" "}
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="RePassword">RePassword</label>
            <input
              type="password"
              className="form-control"
              id="RePassword"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="bg-warning ps-2 my-2">
                {" "}
                {formik.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="uPhone">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="uPhone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.phone}</div>
            ) : null}
          </div>
          {isLoading ? (
            <>
              <button className="btn bg-main text-white d-block ms-auto ">
                <i className="fa fa-spin fa-spinner"> </i>
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="btn bg-main text-white d-block ms-auto "
              disabled={!(formik.isValid && formik.dirty)}
            >
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
