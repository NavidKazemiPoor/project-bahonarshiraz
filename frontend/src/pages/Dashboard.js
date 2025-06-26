import React from "react";
import "./dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useGlobalContext_User } from "./../context/userContext";

const Dashboard = () => {
  const nav = useNavigate();
  const { currentUser } = useGlobalContext_User();
  return (
    <div className="container dashcon  mt">
        <h1>نقش: {currentUser.role == "admin" ? 'مدیر':'کاربر عادی'}</h1>
      <div className="center dashcenter">
        {currentUser.role=='admin' ? (
          <div className="pages" onClick={() => nav("/dashboard/user")}>
            مدیریت کاربران
            <FaArrowLeft />
          </div>
        ) : (
          ""
        )}
        {currentUser.role=='admin' ? (
          <div className="pages" onClick={() => nav("/dashboard/manageproducts")}>
            مدیریت محصولات
            <FaArrowLeft />
          </div>
        ) : (
          ""
        )}
        {currentUser.role=='admin' ? (
          <div className="pages" onClick={() => nav("/dashboard/reviews")}>
            نظرات
            <FaArrowLeft />
          </div>
        ) : (
            <div className="pages" onClick={() => nav("/dashboard/myreviews")}>
            نظرات من
            <FaArrowLeft />
          </div>
        )}
        {currentUser.role=='admin' ? (
          <div className="pages" onClick={() => nav("/dashboard/allorders")}>
            سفارشات
            <FaArrowLeft />
          </div>
        ) : (
            <div className="pages" onClick={() => nav("/dashboard/myorders")}>
            سفارشات من
            <FaArrowLeft />
          </div>
        )}
      </div>
      <div className="bot-dash">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
