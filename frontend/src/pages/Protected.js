import React, { useEffect, useState } from "react";
import Login from "./Login";
import { toast } from "react-toastify";
import { useGlobalContext_User } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
const ProtectedRoute = React.memo(({ children }) => {
const {currentUser} = useGlobalContext_User();
const nav = useNavigate()


if(!currentUser)
{
  return <Login />
}

  return children;
});

export default ProtectedRoute;
