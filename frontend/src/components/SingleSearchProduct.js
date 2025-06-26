import React, { useEffect } from "react";
import { useGlobalContext_Product } from "../context/productContext";
import Loading from "./Loading";
import './SingleSearch.css'
import { useGlobalContext_Cart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

const SingleSearchProduct = ({limit,cat}) => {
  const { AllProduct, getSearchProducts, isLoading } = useGlobalContext_Product();
  const {addToCart} = useGlobalContext_Cart()
  const nav = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
  const searchQuery = searchParams.get('name'); // استخراج پارامتر name
    getSearchProducts(searchQuery);
    console.log(AllProduct)
  },[searchParams]);

  if (!AllProduct || isLoading) {
    return <Loading />;
  }
  if(AllProduct.length ==0){
  
    
    return <h1>محصولی یافت نشد</h1>
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

export default SingleSearchProduct;
