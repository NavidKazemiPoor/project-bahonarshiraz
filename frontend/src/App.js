import React, { useEffect } from "react";
import { Routes, Route, json } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { toast } from "react-toastify";
import { useGlobalContext_User } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import Protected from "./pages/Protected";
import UserManager from "./pages/UserManager";
import UpdateUser from "./pages/UpdateUser";
import ManageProducts from "./pages/Products/ManageProducts";
import UpdateProduct from "./pages/Products/UpdateProduct";
import Products from "./pages/Products/Products";
import Computer from "./pages/Products/Computer";
import Console from "./pages/Products/Console";
import Laptop from "./pages/Products/Laptop";
import Cart from "./pages/Orders/Cart";
import AllOrders from "./pages/Orders/AllOrders";
import MyOrders from "./pages/Orders/MyOrders";
import SingleProductPage from "./pages/Products/SingleProductPage";
import Reviews from "./pages/Reviews/Reviews";
import MyReviews from "./pages/Reviews/MyReviews";
import Search from "./pages/Search";

const App = () => {
  const { setCurrentUser } = useGlobalContext_User();
  useEffect(() => {
    // Get an item from localStorage
    
    if (localStorage.getItem("user")) {
      const data = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(data);
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div className="container mt">test</div>} />
        <Route path="product" element={<Products />} />
        <Route path="product/computer" element={<Computer />} />
        <Route path="product/laptop" element={<Laptop />} />
        <Route path="product/console" element={<Console />} />
        <Route path="search" element={<Search />} />
        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          <Route path="user" element={<UserManager />} />
          <Route path="cart" element={<Cart />} />
          <Route path="allorders" element={<AllOrders />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="myreviews" element={<MyReviews />} />
          <Route path="updateUser/:id" element={<UpdateUser />} />
          <Route path="manageproducts" element={<ManageProducts />} />
          <Route path="editproduct/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
