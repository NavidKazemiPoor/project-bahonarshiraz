import React, { useEffect, useState } from "react";
import { useGlobalContext_Product } from "../../context/productContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import "./singleproduct.css";
import { useGlobalContext_User } from "../../context/userContext";
import { useGlobalContext_Cart } from "../../context/cartContext";
import { useGlobalContext_Review } from "../../context/reviewContext";
const SingleProductPage = () => {
  const { getSingleProduct, singleProduct, isLoading, getRec,AllProduct } =
    useGlobalContext_Product();
  const { createReview, singleProductReview, getSingleProductReview } =
    useGlobalContext_Review();
  const { addToCart } = useGlobalContext_Cart();
  const { currentUser } = useGlobalContext_User();
  const [click, setClick] = useState(true);
  const [comment, setComment] = useState("");
  const nav = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getSingleProduct(id);
  
    let user = localStorage.getItem("user")
     if(user){
    const parsedUser = JSON.parse(user);
   
    
  
      getRec(parsedUser._id);
  
    }
    getSingleProductReview(id);
  }, []);

  if (!singleProduct || !singleProductReview || isLoading) {
    return (
      <div className="container mt">
        <div className="center">
          <Loading />
        </div>
      </div>
    );
  }
  return (
    <div className="container mt">
      <div className="center">
        <div className="product-sec">
          <div className="left-section">
            <img
              src={`${process.env.REACT_APP_API}/${singleProduct.productImage}`}
              alt=""
            />
          </div>
          <div className="right-section">
            <h2>نام محصول: {singleProduct.name}</h2>
            <h2>
              قیمت محصول:{" "}
              {singleProduct.price
                .toFixed(0)
                .replace(/\d(?=(\d{3})+$)/g, "$&,")}{" "}
              - تومان
            </h2>
            {singleProduct.category == "کنسول" && (
              <h3>
                دسته بندی محصول:{" "}
                <span
                  className="cat-pr"
                  onClick={() => nav(`/product/console`)}
                >
                  {singleProduct.category}
                </span>
              </h3>
            )}
            {singleProduct.category == "لپ تاپ" && (
              <h3>
                دسته بندی محصول:{" "}
                <span className="cat-pr" onClick={() => nav(`/product/laptop`)}>
                  {singleProduct.category}
                </span>
              </h3>
            )}
            {singleProduct.category == "کامپیوتر" && (
              <h3>
                دسته بندی محصول:{" "}
                <span
                  className="cat-pr"
                  onClick={() => nav(`/product/computer`)}
                >
                  {singleProduct.category}
                </span>
              </h3>
            )}
            {/* <h3>دسته بندی محصول: <span className="cat-pr" onClick={()=>nav(`/product/${singleProduct.category}`)}>{singleProduct.category}</span></h3> */}
            <p>توضیحات: {singleProduct.description || "ندارد"}</p>
            <button
              className="add-to-cart-btn"
              onClick={() =>
                addToCart({
                  product: singleProduct._id,
                  name: singleProduct.name,
                  price: singleProduct.price,
                  image: singleProduct.productImage,
                })
              }
            >
              افزودن به سبد خرید
            </button>
          </div>
        </div>
        {currentUser ? (
          <div className="review-section">
            <div className="review-top">
              <h2>نظرات</h2>
              <h2 className="add-review" onClick={() => setClick(!click)}>
                {click ? "ثبت نظر" : "بستن ثبت نظر"}
              </h2>
            </div>
            {!click && (
              <div className="add-review-section">
                <label htmlFor="">نام کاربر: </label>
                <input type="text" disabled={true} value={currentUser.name} />
                <label htmlFor="">نظر شما: </label>
                <input
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={() => createReview({ comment, product: id })}>
                  ارسال نظر
                </button>
              </div>
            )}
            <div className="reviews-sec">
              {singleProductReview.map((item, index) => {
                if (item.verify == false) {
                  return;
                }
                return (
                  <div key={index} className="box-review">
                    <h3>{item.user.name}</h3>
                    <p>{item.comment}</p>
                    {item.answer && <p>پاسخ: {item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>
            برای ثبت نظر وارد شوید.{" "}
            <span className="login-to-site" onClick={() => nav("/login")}>
              ورود به سایت
            </span>
          </p>
        )}
  {currentUser ?      <div className="rec-sec">
          {AllProduct ? AllProduct.map((item)=>{
            return <div key={item.id} className="singleProduct-box single2">
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
          <div className="singleProduct-box-btn singleProduct-box-btn2">
            <button onClick={()=>addToCart({product:item._id,name:item.name,price:item.price,image:item.productImage})}>افزودن به سبد خرید</button>
            <button onClick={()=>window.location.replace(`/product/${item._id}`)}>مشاهده</button>
            {/* <button onClick={()=>nav(`/product/${item._id}`)}>مشاهده</button> */}
          </div>
        </div>;
          }): <></>}
        </div>:<></>}
   
      </div>
    </div>
  );
};

export default SingleProductPage;
