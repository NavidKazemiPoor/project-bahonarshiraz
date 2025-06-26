import React, { useContext, useReducer } from "react";
import reducer from "./../reducer/reviewReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const apiEndPoint = `${process.env.REACT_APP_API}/api/v1/reviews`;
const initialState = {
  isLoading: false,
  allReviews: null,
  singleProductReview: null,
  myReviews: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, initialState);
  const nav = useNavigate();

  const createReview = async ({ comment, product }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.post(apiEndPoint, {
        comment,
        user: user._id,
        product,
      });
      dispach({ type: "loading_false" });
      await getAllReviews();
      toast.info("نظر بعد از تایید نمایش داده میشود.");
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکل در ثبت نظر");
      console.log(error);
    }
  };
  const getAllReviews = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(apiEndPoint);
      dispach({ type: "getAllReviews", payload: data.reviews });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکل در دریافت نظرات");
      console.log(error);
    }
  };

  const getSingleProductReview = async (id) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(`${apiEndPoint}/single/${id}`);
      dispach({ type: "single", payload: data.reviews });
      console.log(data);
      
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکل در دریافت نظرات");
      console.log(error);
    }
  };
  const approveReview = async (id, answer) => {
    console.log(id);
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.patch(`${apiEndPoint}/${id}`, {
        verify: true,
        answer,
      });
      dispach({ type: "loading_false" });
      toast.success("ویرایش انجام شد.");
      await getAllReviews();
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکل در دریافت نظرات");
      console.log(error);
    }
  };

  const deleteReview = async (id) => {
    console.log(id);
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.delete(`${apiEndPoint}/${id}`);
      dispach({ type: "loading_false" });
      await getAllReviews();
      toast.info("حذف انجام شد.");
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکل در حذف نظر");
      console.log(error);
    }
  };

  const getMyReviews = async (id) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(`${apiEndPoint}/myreviews/${id}`);
      dispach({type:"getMy",payload:data})
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error("مشکل در دریافت نظرات");
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        approveReview,
        createReview,
        getMyReviews,
        deleteReview,
        getAllReviews,
        getSingleProductReview,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext_Review = () => {
  return useContext(AppContext);
};

export default AppProvider;
