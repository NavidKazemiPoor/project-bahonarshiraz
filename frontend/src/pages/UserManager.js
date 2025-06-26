import React, { useEffect } from "react";
import { useGlobalContext_User } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "./../components/Loading";
import { toast } from "react-toastify";
const UserManager = () => {
  const { currentUser,deleteUser, getAllUser, AllUser, isLoading } =
    useGlobalContext_User();
  const nav = useNavigate();
  useEffect(() => {
    getAllUser();
    if (currentUser.role != "admin") {
      nav("/login");
    }
  }, []);
  if (!AllUser || isLoading) {
    return <Loading />;
  }
  return (
    <div className="container usermanager-con">
      {AllUser.map((item, index) => {
        return (
          <div key={index} className="user-box">
            <h3>نام کاربر: {item.name}</h3>
            <h3>ایمیل کاربر: {item.email}</h3>
            <p>نقش کاربر: {item.role}</p>
            <p>شناسه کاربر: {item._id}</p>
            <div className="control-user-box">
              <button className="edit-user-box" onClick={()=>nav(`/dashboard/updateUser/${item._id}`)}>ویرایش</button>
              {item.role=="admin" ? <button className="delete-user-box" onClick={()=>toast.error("نمیتوانید کاربر ادمین را حذف کنید.")}>حذف</button> : <button className="delete-user-box" onClick={()=>deleteUser(item._id)}>حذف</button> }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserManager;
