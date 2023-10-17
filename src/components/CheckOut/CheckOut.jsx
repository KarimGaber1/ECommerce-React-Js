import React, { useContext } from "react";
import "./CheckOut.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";

export default function CheckOut() {
  let { OnlinePayment } = useContext(cartContext);
  async function payment(values) {
    let { data } = await OnlinePayment(values);
    window.location.href = data.session.url;
  }

  let validationSchema = Yup.object({
    details:Yup.string().required('Details is required'),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone is invalid")
      .required("Phone is required"),
    city:Yup.string().required('City is required')
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: payment,
  });

  return (
    <>
      <div className="container p-5">
        <div className="mx-auto bg-main-light p-5">
          <h2 className="py-3">Shipping Address :</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="details">Details</label>
              <input
                type="text"
                className="form-control"
                id="details"
                name="details"
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.details && formik.touched.details ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.details}</div>
            ) : null}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.phone}</div>
            ) : null}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
                {formik.errors.city && formik.touched.city ? (
              <div className="bg-warning ps-2 my-2"> {formik.errors.city}</div>
            ) : null}
            </div>
            <button className="btn bg-main w-100 text-white fw-bold">
              Pay Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
