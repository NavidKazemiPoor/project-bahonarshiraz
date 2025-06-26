import React, { useContext, useReducer } from "react";
import reducer from "./../reducer/productReducer";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const apiEndPoint = `${process.env.REACT_APP_API}/api/v1/products`;
const apiEndPointRec = `${process.env.REACT_APP_API}/api/v1/rec`;
const initialState = {
  isLoading: false,
  AllProduct: null,
  singleProduct: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispach] = useReducer(reducer, initialState);
  const nav = useNavigate();

  const createProduct = async ({
    name,
    price,
    productImage,
    description,
    category,
  }) => {
    // if(!name && !price && !productImage){
    //     toast.error('همه فیلد ها را پر کنید.')
    //     return
    // }
    const formData = new FormData();
    const imageFile = productImage;
    formData.append("Image", imageFile);

    try {
      // const fileName = imageFile.split("\\").pop();
      dispach({ type: "loading_true" });
      const u = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(apiEndPoint, {
        name,
        price,
        category,
        description,
        productImage: `uploads/${imageFile.name || "example.png"}`,
        user: u._id,
      });
      toast.success("با موفقیت ثبت شد");
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error("مشکلی پیش آمده");
      console.log(error);
    }
    if (productImage) {
      try {
        // console.log(apiEndPoint+'/uploadimg');
        await axios.post(`${apiEndPoint}/uploadimg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        toast.error("مشکل در اپلود تصویر");
      }
    }
    try {
      await getAllProducts();
    } catch (error) {}
  };

  const getAllProducts = async () => {
    try {
      dispach({ type: "loading_true" });

      const { data } = await axios.get(apiEndPoint);
      dispach({ type: "getAllProduct", payload: data });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error(error);
      console.log(error);
    }
  };

const getSearchProducts = async (query) => {
    try {
      
      dispach({ type: "loading_true" });
      dispach({ type: "clearsearch" });
      console.log(`${apiEndPoint}/search?name=${query}`)

      const { data } = await axios.get(`${apiEndPoint}/search?name=${query}`);
      dispach({ type: "getSearchProducts", payload: data });
      console.log(data)
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error(error);
      console.log(error);
    }
  };



  const deleteProduct = async (id) => {
    try {
      dispach({ type: "loading_true" });
      await axios.delete(`${apiEndPoint}/${id}`);
      dispach({ type: "deleteProduct", payload: id });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });
      toast.error(error);
      console.log(error);
    }
  };

  const editProduct = async ({
    name,
    price,
    productImage,
    description,
    category,
    id,
    edit,
  }) => {
      console.log(edit);

    const formData = new FormData();
    const imageFile = productImage;
    formData.append("Image", imageFile);
    try {
      dispach({ type: "loading_true" });
      let data2 = {};
      if (edit) {
        const { data } = await axios.patch(`${apiEndPoint}/${id}`, {
          name,
          price,
          productImage: `uploads/${imageFile.name || "example.png"}`,
          description,
          category,
        });
        data2 = data;
      } else {
        const { data } = await axios.patch(`${apiEndPoint}/${id}`, {
          name,
          price,
          productImage,
          description,
          category,
        });
        data2 = data;
      }
      if (edit) {
        await axios.post(`${apiEndPoint}/uploadimg`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      dispach({ type: "editProduct", payload: data2 });
      dispach({ type: "loading_false" });
      toast.success("با موفقیت ویرایش شد.");
      nav('/dashboard/manageproducts')
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error("مشکل در ویرایش");
      console.log(error);

    }
    try {
    } catch (error) {}
  };
  const getSingleProduct = async (id) => {
    try {
      dispach({ type: "loading_true" });

      const { data } = await axios.get(`${apiEndPoint}/${id}`);
      dispach({ type: "getSingleProduct", payload: data });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error(error);
      console.log(error);
    }
  };


const getRec = async (id) => {
    try {
      dispach({ type: "loading_true" });
      const { data } = await axios.get(`${apiEndPointRec}/${id}`);
      console.log(data.recommendations)
      dispach({ type: "rec", payload: data.recommendations });
      dispach({ type: "loading_false" });
    } catch (error) {
      dispach({ type: "loading_false" });

      toast.error(error);
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        createProduct,
        getAllProducts,
        getSingleProduct,
        deleteProduct,
        editProduct,
        getSearchProducts,
        getRec,
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext_Product = () => {
  return useContext(AppContext);
};

export default AppProvider;
