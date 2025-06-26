import React, { useEffect } from "react";
import { useGlobalContext_Cart } from "../../context/cartContext";
import "./cart.css";
import { useGlobalContext_Orders } from "../../context/orderContext";
const Cart = () => {
  const { cartItems, total, clearCart, deleteFromCart } =
    useGlobalContext_Cart();
  const { createOrders } = useGlobalContext_Orders();

  if (total == 0) {
    return <h2>سبد خرید خالی است</h2>;
  }
  return (
    <div className="container">
      <div className="center cart-center">
        {cartItems.map((item, index) => {
          return (
            <div key={index} className="row-cart">
              <img
                src={`${process.env.REACT_APP_API}/${item.image}`}
                alt="name"
              />
              <h3>{item.name}</h3>
              <h3>
                {item.price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}
              </h3>
              <button
                className="cart-delete"
                onClick={() => deleteFromCart(item.product)}
              >
                حذف
              </button>
            </div>
          );
        })}
        <h2 className="totalprice">
          قیمت کل: {total.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}
        </h2>
        <button className="clearcart" onClick={() => clearCart()}>
          خالی کردن سبد
        </button>
        <button className="order" onClick={() => createOrders()}>
          تکمیل سفارش
        </button>
      </div>
    </div>
  );
};

export default Cart;
