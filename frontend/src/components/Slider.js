import React, { useEffect, useState } from "react";
import slider1 from "./../assets/slider1.jpg";
import slider2 from "./../assets/slider2.jpg";
import "./Slider.css";
import { useNavigate } from "react-router-dom";
const Slider = () => {
  const [slide, setSlide] = useState(0);
  const array = [slider1, slider2];
  const [active, setActive] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const timeid = setTimeout(() => {
      if (slide == 0) {
        setSlide(1);
      } else if (slide == 1) {
        setSlide(0);
      }
    }, 4000);
    return () => {
      clearTimeout(timeid);
    };
  }, [slide]);
  return (
    <div className="slider-con">
      <div className="slider">
        <img src={array[slide]} alt="" onClick={()=>{
          if(array[slide] == slider1){
           nav('/product/laptop') 
          }
          else{
            nav('/product/computer')
          }
        }} />
        <div
          className={`line line-1 ${slide == 0 ? "active" : ""} `}
          onClick={() => {
            setSlide(0);
          }}
        ></div>
        <div
          className={`line line-2 ${slide == 1 ? "active" : ""}`}
          onClick={() => {
            setSlide(1);
          }}
        ></div>
      </div>
    </div>
  );
};

export default Slider;
