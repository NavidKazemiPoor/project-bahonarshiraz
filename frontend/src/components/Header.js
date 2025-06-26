import React, { useState } from "react";
import { FaUserAlt, FaLaptop, FaGamepad, FaShoppingCart } from "react-icons/fa";
import { FaComputer, FaHeadphones, FaCircleInfo } from "react-icons/fa6";
import logo from "./../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useGlobalContext_User } from "../context/userContext";
import { useGlobalContext_Cart } from "../context/cartContext";
const Header = () => {
  const nav = useNavigate();
  const { num } = useGlobalContext_Cart();
  const { currentUser, logout } = useGlobalContext_User();
  const [searchValue, setSearchValue] = useState("");
  const handlesearch = (e) => {
    if (e.key == "Enter" && searchValue) {
      e.preventDefault();
      nav(`/search?name=${searchValue}`);
    }
  };
  return (
    <div className="header-container">
      <div className="header-center">
        <div className="header-top">
          <img src={logo} onClick={() => nav("/")} alt="" />
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handlesearch}
            placeholder="جستجو..."
            className="search-header"
          />
          <div className="group">
            <div className="groupx">
              <FaShoppingCart onClick={() => nav("dashboard/cart")} />
              <p className="num" onClick={() => nav("dashboard/cart")}>
                {num}
              </p>
            </div>
            {currentUser ? (
              <button className="gotodash" onClick={() => nav("dashboard")}>
                پنل کاربری
              </button>
            ) : (
              <FaUserAlt onClick={() => nav("register")} />
            )}
            {currentUser ? (
              <p className="logout" onClick={() => logout()}>
                خروج
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="header-bot">
          <li>
            <Link className="mine" to="product">
              همه محصولات
            </Link>
          </li>
          <li>
            <Link className="mine" to="product/computer">
              <FaComputer className="h-icon"></FaComputer>کامپیوتر
            </Link>
          </li>
          <li>
            <Link className="mine" to="product/laptop">
              <FaLaptop className="h-icon" />
              لپ تاپ
            </Link>
          </li>
          <li>
            <Link className="mine" to="product/console">
              <FaGamepad className="h-icon" />
              کنسول بازی
            </Link>
          </li>
          <li>
            <Link className="mine" to="/aboutus">
              <FaCircleInfo className="h-icon" />
              درباره ما
            </Link>
          </li>
          <li>
            <Link className="mine" to="/contact">
              <FaHeadphones className="h-icon" />
              ارتباط با ما
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Header;
