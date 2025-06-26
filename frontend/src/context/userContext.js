import React, { useContext, useReducer } from "react";
import reducer from "./../reducer/userReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGlobalContext_Cart } from "./cartContext";
const apiEndPoint = `${process.env.REACT_APP_API}/api/v1/users`;
const initialState = {
  isLoading: false,
  AllUsers: null,
  currentUser: null,
  singleUser: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { clearCart } = useGlobalContext_Cart();
  const [state, dispach] = useReducer(reducer, initialState);
  const nav = useNavigate();
  const register = async ({ name, email, password }) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.post(apiEndPoint, { name, email, password });
      dispach({ type: "loading_false" });
      toast.success("ثبت نام با موفقیت انجام شد.");
      nav("/login");
    } catch (error) {
      dispach({ type: "loading_false" });
      if (error.code == "ERR_NETWORK") {
        toast.error("مشکل در دیتابیس...");
        return;
      }

      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const login = async ({ email, password }) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.post(`${apiEndPoint}/login`, {
        email,
        password,
      });
      toast.success(`خوش آمدید ${data.name}`);
      console.log(data);
      dispach({ type: "set_current_user", payload: data });
      dispach({ type: "loading_false" });
      clearCart();

      nav("/dashboard");
    } catch (error) {
      dispach({ type: "loading_false" });
      if (error.code == "ERR_NETWORK") {
        toast.error("مشکل در دیتابیس...");
        return;
      }
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const setCurrentUser = (data) => {
    dispach({ type: "set_current_user", payload: data });
  };
  const logout = () => {
    dispach({ type: "logout" });
    clearCart();
    toast.info("شما خارج شدید.");
  };

  const getAllUser = async () => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(apiEndPoint);
      dispach({ type: "set_allUser", payload: data });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
    }
  };

  const deleteUser = async (id) => {
    try {
      dispach({ type: "loading_true" });
      await axios.delete(`${apiEndPoint}/${id}`);
      dispach({ type: "delete_user", payload: id });
      dispach({ type: "loading_false" });
      toast.info("کاربر حذف شد.");
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error("مشکل در حذف");
      console.log(error);
    }
  };

  const getSingleUser = async (id) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(`${apiEndPoint}/${id}`);
      dispach({ type: "get_singleUser", payload: data });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکلی پیش آمده");
      console.log(error);
    }
  };
  const editUser = async ({ id, name, email, password }) => {
    console.log(password, name, id, email);
    try {
      await getAllUser();
      dispach({ type: "loading_true" });
      const { data } = await axios.patch(`${apiEndPoint}/${id}`, {
        name,
        email,
        password,
      });
      dispach({
        type: "change_allUser",
        payload: { id, name, email, password },
      });
      dispach({ type: "loading_false" });
      toast.success(`ویرایش روی کاربر ${name} انجام شد`);
      clearSingleUser();
      nav("/dashboard/user");
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error("مشکلی پیش آمده");
      console.log(error);
    }
  };
  const clearSingleUser = () => {
    dispach({ type: "clear_singleUser" });
  };
  return (
    <AppContext.Provider
      value={{
        register,
        login,
        setCurrentUser,
        logout,
        getAllUser,
        getSingleUser,
        editUser,
        deleteUser,
        clearSingleUser,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext_User = () => {
  return useContext(AppContext);
};

export default AppProvider;
