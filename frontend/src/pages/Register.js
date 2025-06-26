import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginregister.css";
import { useGlobalContext_User } from "./../context/userContext";
import Loading from "../components/Loading";
const Register = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { register, isLoading } = useGlobalContext_User();
  return (
    <div className="container mt">
      <div className="login-center">
        <h1>فرم ثبت نام</h1>
        <label>نام و نام خانوادگی:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="نام خود را وارد کنید ..."
        />
        <label>ایمیل:</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="ایمیل خود را وارد کنید ..."
        />
        <label>رمز عبور:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="پسورد خود را وارد کنید ..."
        />
        {isLoading ? (
          <Loading />
        ) : (
          <button onClick={() => register({ email, name, password })}>
            ثبت نام
          </button>
        )}
        {/* <button onClick={() => register({ email, name, password })}>
          ثبت نام
        </button> */}
        <p>
          حساب کاربری داری؟ <span onClick={() => nav("/login")}>ورود</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
