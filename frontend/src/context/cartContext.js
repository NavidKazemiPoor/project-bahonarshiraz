import React, { useContext, useReducer } from "react";
import reducer from "../reducer/cartReducer.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

// const apiEndPoint = `${process.env.REACT_APP_API}/api/v1/products`;
const cart = JSON.parse(localStorage.getItem("cart"));
let initialState = {};
if (cart) {
  initialState = {
    isLoading: cart.isLoading,
    cartItems: cart.cartItems,
    num: cart.num,
    total: cart.total,
  };
} else {
  initialState = {
    isLoading: false,
    cartItems: [],
    num: 0,
    total: 0,
  };
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, initialState);
  const nav = useNavigate();
  // افزودن به سبد خرید
  const addToCart = ({ name, price, image, product }) => {
    const cartItem = {
      name,
      price,
      image,
      product,
    };
    const check = state.cartItems.findIndex((item, index) => {
      return item.product == cartItem.product;
    });
    if (check != -1) {
      toast.info("این محصول در سبد خرید وجود دارد.");
      return;
    }

    dispach({ type: "addToCart", payload: cartItem });
  };
  const deleteFromCart = (id) => {
    dispach({ type: "deleteFromCart", payload: id });
  };
  const clearCart = () => {
    dispach({ type: "clearCart" });
  };

  return (
    <AppContext.Provider
      value={{
        addToCart,
        clearCart,
        deleteFromCart,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext_Cart = () => {
  return useContext(AppContext);
};

export default AppProvider;
