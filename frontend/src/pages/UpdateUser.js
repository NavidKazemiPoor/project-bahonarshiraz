import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext_User } from "../context/userContext";
import Loading from "../components/Loading";

const UpdateUser = () => {
  const { id } = useParams();
  const {
    currentUser,
    isLoading,
    getSingleUser,
    singleUser,
    editUser,
    clearSingleUser,
  } = useGlobalContext_User();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  useEffect(() => {
    getSingleUser(id);
    if (currentUser.role != "admin") {
      nav("/login");
    }
  }, []);
  useEffect(() => {
    if (name && email && password) {
      editUser({ name, email, password, id });
      
    }
  }, [submit]);
  if (!singleUser || isLoading) {
    return <Loading />;
  }
  const submitEdit = () => {
    if (!email) {
      setEmail(singleUser.email)
    }
    if (!password) {
      setPassword(singleUser.password);
    }
    if (!name) {
      setName(singleUser.name);
    }
    setSubmit(true);
  };
  return (
    <div className="container eidtUserCon">
      <div className="center">
        <form onSubmit={(e) => e.preventDefault()} className="edit-user-form">
          <label htmlFor="">نام:</label>
          <input
            type="text"
            defaultValue={singleUser.name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">ایمیل:</label>
          <input
            type="email"
            defaultValue={singleUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="">پسورد:</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <div className="editUser-btn">
            <button onClick={() => submitEdit()}>ویرایش</button>
            <button
              onClick={() => {
                clearSingleUser();
                nav("/dashboard/user");
              }}
            >
              بازگشت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
