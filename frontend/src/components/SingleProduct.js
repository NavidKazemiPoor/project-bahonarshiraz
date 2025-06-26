import React, { useEffect } from "react";
import { useGlobalContext_Product } from "../context/productContext";
import Loading from "./Loading";
import './SingleProduct.css'
import { useGlobalContext_Cart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
const SingleProduct = ({limit,cat}) => {
  const { AllProduct, getAllProducts, isLoading } = useGlobalContext_Product();
  const {addToCart} = useGlobalContext_Cart()
  const nav = useNavigate();
  useEffect(() => {
    getAllProducts();
  },[]);

  if (!AllProduct || isLoading) {
    return <Loading />;
  }
  return (
    <>
      {AllProduct.map((item, index) => {
        if(cat && item.category != cat){
          return
        }
        if(limit == 3 && index >= limit){
        return 
        }
        if(limit == 'last'){
          const count = AllProduct.length - 3;
          if(index < count){
            return 
          }
        }
        return <div key={index} className="singleProduct-box">
          <img
            src={`${process.env.REACT_APP_API}/${item.productImage}`}
            alt="product name"
          />
          <h3>نام محصول: {item.name}</h3>
          <h4 className="price">
            قیمت محصول:{" "}
            {item.price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")} - تومان
          </h4>
          <h4>دسته بندی محصول: {item.category}</h4>
          <div className="singleProduct-box-btn">
            <button onClick={()=>addToCart({product:item._id,name:item.name,price:item.price,image:item.productImage})}>افزودن به سبد خرید</button>
            <button onClick={()=>nav(`/product/${item._id}`)}>مشاهده</button>
          </div>
        </div>;
      })}
    </>
  );
};

export default SingleProduct;
