import React, { useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Details from './components/Details/Details';
import WishList from "./components/WishList/WishList";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import Notfound from "./components/Notfound/Notfound";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import RestPassword from "./components/RestPassword/RestPassword";
import RestAccount from "./components/RestAccount/RestAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: "wishlist", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
      { path: "details/:id", element: <ProtectedRoutes><Details /></ProtectedRoutes> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "resetPassword", element: <RestPassword /> },
      { path: "resetAccount", element: <RestAccount /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "allorders", element: <AllOrders /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  let { setToken } = useContext(tokenContext)

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'))
    }
  },[])
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App;