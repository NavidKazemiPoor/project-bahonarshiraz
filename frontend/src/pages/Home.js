import React from "react";
import Slider from "../components/Slider";
import lap from "./../assets/lap.png";
import com from "./../assets/computer.png";
import con from "./../assets/console.png";
import "./Home.css";
import { FaChevronLeft } from "react-icons/fa6";
import SingleProduct from "../components/SingleProduct";
import Footer from './../components/Footer'
import { useNavigate } from "react-router-dom";
const Home = () => {

  const nav = useNavigate();
  return (
    <>
    <div className="container mt">
      <div className="center">
        <Slider />
        <div className="row">
          <div className="box-info">
            <img src={lap} alt="" />
            <h2>لپ تاپ</h2>
            <div className="ch">
              <FaChevronLeft />
            </div>
          </div>
          <div className="box-info">
            <img src={com} alt="" />
            <h2>کامپیوتر</h2>
            <div className="ch">
              <FaChevronLeft />
            </div>
          </div>
          <div className="box-info">
            <img src={con} alt="" />
            <h2>کنسول بازی</h2>
            <div className="ch">
              <FaChevronLeft />
            </div>
          </div>
        </div>
        <div className="product-h">
          <h1>جدید ترین محصولات</h1>
        </div>
        <div className="new-products">
          <SingleProduct limit={"last"} />
        </div>
        <div className="product-h">
          <h1>پرفروش ترین محصولات</h1>
        </div>
        <div className="new-products">
          <SingleProduct limit={3} />
        </div>

        <div className="about-home-novin">
          <p>با ما در ارتباط باشید</p>
          <p>گروه نوین کامپیوتر 24 ساعته پاسخگوی شماست .</p>
          <p>جهت مشاوره خرید سیستم ، تعمیرات و ... تماس بگیرید.</p>
          <button onClick={()=>nav('/contact')}>ارتباط با ما</button>
        </div>
      </div>

    </div>
      <Footer />
      </>
  );
};

export default Home;
