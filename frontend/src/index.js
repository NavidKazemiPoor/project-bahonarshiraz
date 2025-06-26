import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserProvider from "./context/userContext";
import ProductProvider from "./context/productContext";
import CartProvider from "./context/cartContext";
import OrderProvider from "./context/orderContext";
import ReviewProvider from "./context/reviewContext";
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ReviewProvider children>
      <CartProvider children>
        <OrderProvider children>
          <ProductProvider children>
            <UserProvider children>
              <App />
            </UserProvider>
          </ProductProvider>
        </OrderProvider>
      </CartProvider>
    </ReviewProvider>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      limit={1}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);
