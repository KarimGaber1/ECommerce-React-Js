import React, { useContext } from "react";
import "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/tokenContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  let { numOfCartItems } = useContext(cartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="page logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/"}
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/products"}
                  >
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/categories"}
                  >
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/brands"}
                  >
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/wishlist">
                    WishList
                  </Link>
                </li>
              </ul>
            ) : (
              " "
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <i className="fab fa-facebook-f mx-1"></i>
                <i className="fab fa-twitter mx-1"></i>
                <i className="fab fa-instagram mx-1"></i>
                <i className="fab fa-tiktok mx-1"></i>
                <i className="fab fa-youtube mx-1"></i>
                <i className="fab fa-linkedin mx-1"></i>
              </li>
              {token? (
                <>
                  <li className="nav-item fw-bold ">
                    <button
                      className="nav-link active "
                      aria-current="page"
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item position-relative">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/cart"}
                    >
                      <i className="fa fa-shopping-cart fs-4"></i>
                      <span className="bg-main badge position-absolute top-0 end-0 text-white">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fw-bold"
                      aria-current="page"
                      to={"/register"}
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active fw-bold"
                      aria-current="page"
                      to={"/login"}
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
