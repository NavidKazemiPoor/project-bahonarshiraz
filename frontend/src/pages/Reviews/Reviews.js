import React, { useEffect, useState } from "react";
import { useGlobalContext_Review } from "../../context/reviewContext";
import Loading from "../../components/Loading";
import "./allreview.css";
import { useNavigate } from "react-router-dom";
const Reviews = () => {
  const { allReviews, getAllReviews, deleteReview,isLoading, approveReview } =
    useGlobalContext_Review();
  const [click, setClick] = useState(false);
  const [answer, setAnswer] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    getAllReviews();
  }, []);

  if (!allReviews || isLoading) {
    return <Loading />;
  }
  return (
    <div className="reviews-con">
      {allReviews.map((item, index) => {
        return (
          <div key={index} className="reviews-box">
            <h2>کاربر: {item.user.name}</h2>
            <p>نظر: {item.comment}</p>
            <p
              className="pr-review"
              onClick={() => nav(`/product/${item.product._id}`)}
            >
              برای محصول: {item.product.name}
            </p>
            <p>
              وضعیت:{" "}
              <span className={`${item.verify ? "verify" : "notVerify"}`}>
                {item.verify ? "تایید شده" : "تایید نشده"}
              </span>
            </p>
            {item.answer && <p>پاسخ: {item.answer}</p>}

          
            <button className="approve" onClick={() => approveReview(item._id)}>
              تایید
            </button>
            <button className="delete" onClick={()=>deleteReview(item._id)}>حذف</button>
         
              <div className="answer-review">
                <input
                  type="text"
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button onClick={() => approveReview(item._id,answer)}>
                  ثبت پاسخ
                </button>
              </div>
          
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
