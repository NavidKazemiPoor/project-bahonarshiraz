import React from "react";
import SingleProduct from "../../components/SingleProduct";
import "./../Home.css";
import { useNavigate } from "react-router-dom";
const Laptop = () => {
    const nav = useNavigate()
  return (
    <>
      <div className="new-products mt p10">
        <SingleProduct cat="لپ تاپ" />
      </div>
    </>
  );
};

export default Laptop;
