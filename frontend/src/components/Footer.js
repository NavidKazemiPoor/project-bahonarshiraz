import React from "react";
import './footer.css'
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const nav = useNavigate()
  return (
    <div className="container footer-con">
      <h1>نوین کامپیوتر</h1>
      <p>
        نشانی تهران، تقاطع خیابان ولیعصر و طالقانی، مجتمع تجاری نور، طبقه همکف
        سوم تجاری، واحد ۸۰۲۸
      </p>
      <div className="social">

      </div>
      <div className="menu-footer">
        <span onClick={()=>nav("/product")}>محصولات</span>
        <span onClick={()=>nav("/dashboard")}>داشبورد کاربری</span>
        <span onClick={()=>nav('/contact')}>ارتباط با ما</span>
        <span onClick={()=>nav('/aboutus')}>درباره ما</span>
      </div>
      <div className="last-foot">
        <p>کلیه حقوق برای نوین کامپیوتر محفوظ میباشد.</p>
      </div>
    </div>
  );
};

export default Footer;
