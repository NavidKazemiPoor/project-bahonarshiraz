import React from "react";
import SingleProduct from "../../components/SingleProduct";
import "./../Home.css";
import { useNavigate } from "react-router-dom";
const Products = () => {
    const nav = useNavigate()
  return (
    <>
    <div className="mn mt">
        <button onClick={()=>nav('/product/computer')}>کامپیوتر</button>
        <button onClick={()=>nav('/product/laptop')}>لپ تاپ</button>
        <button onClick={()=>nav('/product/console')}>کنسول</button>
    </div>
      <div className="new-products p10">
        <SingleProduct />
      </div>
    </>
  );
};

export default Products;
