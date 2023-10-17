import React, { useContext, useState } from "react";
import "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { tokenContext } from "../../Context/tokenContext";


export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  let navigate = useNavigate();
  let { setToken } = useContext(tokenContext)
  async function login(values) {
    setApiError("");
    setIsLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setApiError(err.response.data.message);
        setIsLoading(false);
      });
   
    if (data.message == "success") {
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      setToken(data.token);
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
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => login(values),
  });

  return (
    <>
      <div className="container my-5 p-5">
        <h2 className="mb-4">Login Now :</h2>
        {apiError ? <div className="alert alert-danger">{apiError}</div> : ""}
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
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
          <div>
            <Link
            to={"/forget-password"}
            >
              Forget Password ?</Link>
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
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
