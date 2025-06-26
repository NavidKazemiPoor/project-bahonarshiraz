import React, { useContext, useReducer } from "react";
import reducer from "../reducer/cartOrders.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import { useGlobalContext_Cart } from "./cartContext.js";

const apiEndPoint = `${process.env.REACT_APP_API}/api/v1/orders`;
const initialState = {
    allOrders:null,
    myOrders:null,
    isLoading:false,
}

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [state, dispach] = useReducer(reducer, initialState);
    const nav = useNavigate();
    const {cartItems,total,clearCart} = useGlobalContext_Cart()
    const createOrders = async () =>{
        const user = JSON.parse(localStorage.getItem('user'))
        try {
            const {data} = await axios.post(`${apiEndPoint}`,{
                items:cartItems,
                total,
                userID:user._id
            })
            toast.success("خرید با موفقیت انجام شد.")
            clearCart();
        } catch (error) {
            console.log(error);
        }
    }
  const getAllOrders = async () =>{
    try {
      dispach({type:"loading_true"})
      const {data} = await axios.get(apiEndPoint);
      dispach({type:"allOrders",payload:data.order});
      console.log(data);
      dispach({type:"loading_false"})
    } catch (error) {
      dispach({type:"loading_false"})
      toast.error("مشکلی پیش آمده")
      console.log(error);
    }
  }

  const changeStatus = async (id,status) =>{
    try {
      await axios.patch(`${apiEndPoint}/${id}`,{
        status
      })
      await getAllOrders();
    } catch (error) {
      toast.error("مشکل در تغییر وضعیت")
    }
  }

  const getMyOrders = async (id) =>{
    try {
      dispach({type:"loading_true"})
      const {data} = await axios.get(`${apiEndPoint}/myorders/${id}`);
      dispach({type:"myOrders",payload:data});
      dispach({type:"loading_false"})
    } catch (error) {
      dispach({type:"loading_false"})
      toast.error("مشکلی پیش آمده")
      console.log(error);
    }
  }
  return (
    <AppContext.Provider
      value={{
        createOrders,
        getAllOrders,
        changeStatus,
        getMyOrders,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext_Orders = () => {
  return useContext(AppContext);
};

export default AppProvider;