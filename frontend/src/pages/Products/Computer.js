import React from "react";
import SingleProduct from "../../components/SingleProduct";
import "./../Home.css";
import { useNavigate } from "react-router-dom";
const Computer = () => {
    const nav = useNavigate()
  return (
    <>
      <div className="new-products mt p10">
        <SingleProduct cat="کامپیوتر" />
      </div>
    </>
  );
};

export default Computer;
