import { createContext, useState, useEffect } from "react";
import axios from "axios";

export let cartContext = createContext();
export default function CartContextProvider({ children }) {
  const userToken = localStorage.getItem("userToken");

  async function addToCart(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function getCategory() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => res)
      .catch((err) => err);
  }
  async function getCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: userToken,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async function deleteProductFromCart(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers: {
          token: userToken,
        },
      })
      .then((res) => res)
      .catch((err) => err);
  }
  async function addToWishlist(id) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function getLoggedWishList() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          token: userToken,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function removeFromWishlist(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: {
          token: userToken,
        },
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function updateProductQuantity(id, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  async function OnlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers: {
            token: userToken,
          },
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(null);

  async function getInitialCart() {
    let { data } = await getCart();
    setNumOfCartItems(data?.numOfCartItems);
    setCartId(data?.data._id);
  }

  useEffect(() => {
    getInitialCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        getCart,
        deleteProductFromCart,
        updateProductQuantity,
        OnlinePayment,
        numOfCartItems,
        setNumOfCartItems,
        getCategory,
        addToWishlist,
        getLoggedWishList,
        removeFromWishlist,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
