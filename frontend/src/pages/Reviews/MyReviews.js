import React, { useEffect, useState } from "react";
import { useGlobalContext_Review } from "../../context/reviewContext";
import Loading from "../../components/Loading";
import "./allreview.css";
import { useNavigate } from "react-router-dom";
import { useGlobalContext_User } from "../../context/userContext";
const MyReviews = () => {
  const { myReviews, getMyReviews, isLoading } =
    useGlobalContext_Review();
    const {currentUser} = useGlobalContext_User()
  const [click, setClick] = useState(false);
  const [answer, setAnswer] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    getMyReviews(currentUser._id);
  }, []);

  if (!myReviews || isLoading) {
    return <Loading />;
  }
  return (
    <div className="reviews-con">
      {myReviews.map((item, index) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default MyReviews;
