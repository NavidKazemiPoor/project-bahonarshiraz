import React, { useEffect, useState } from "react";
import { useGlobalContext_Product } from "../../context/productContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
const UpdateProduct = () => {
  const { id } = useParams();
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [catInput, setCatInput] = useState("");
  const [description, setdescription] = useState("");
  const [img, setImg] = useState("");
  const [edit,setEdit] = useState(false);
  const [submit,setSubmit] = useState(false);
  const { editProduct, getSingleProduct, singleProduct, isLoading } =
    useGlobalContext_Product();
    const nav = useNavigate();
  useEffect(() => {
    getSingleProduct(id);
  },[]);

  useEffect(()=>{
    if(nameInput && img && catInput && priceInput){
      editProduct({edit,id,name:nameInput,price:priceInput,category:catInput,productImage:img,description:description});
    }
  },[submit])

  if (!singleProduct || isLoading) {
    return <Loading />;
  }

  const submitUpdate = () =>{
    if(!nameInput){
      setNameInput(singleProduct.name)
    }
    if(!priceInput){
      setPriceInput(singleProduct.price)
    }
    if(!description){
      setdescription(singleProduct.description)
    }
    if(!img){
      setImg(singleProduct.productImage)
    }
    if(!catInput){
      setCatInput(singleProduct.category)
    }
    setSubmit(true);
  }
  return (
    <div className="container">
      <div className="center prodcut-center-edit">
        <form onSubmit={(e)=>e.preventDefault()} className="form-edit-p">
          <label htmlFor="">نام محصول:</label>
          <input
            type="text"
            defaultValue={singleProduct.name}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <label htmlFor="">قیمت محصول:</label>
          <input
            type="text"
            defaultValue={singleProduct.price}
            onChange={(e) => setPriceInput(e.target.value)}
          />
          <label htmlFor="">دسته بندی:</label>
          <select
            name="category"
            id="category"
            defaultValue={singleProduct.category}
            onChange={(e) => setCatInput(e.target.value)}
          >
            <option value="کنسول">کنسول بازی</option>
            <option value="کامپیوتر">کامپیوتر</option>
            <option value="لپ تاپ">لپ تاپ</option>
          </select>
          {edit ? <input type="file" onChange={(e) => setImg(e.target.files[0])} /> : 
             <div className="img-edit">
             <img src={`${process.env.REACT_APP_API}/${singleProduct.productImage}`} alt="" />
             <label htmlFor="" onClick={()=>setEdit(true)}>تغییر</label>
             </div>
          }
          {/* <input type="file" onChange={(e) => setImg(e.target.files[0])} /> */}
          <label htmlFor="">توضیحات:</label>
          <textarea cols="30" rows="10" defaultValue={singleProduct.description} onChange={(e)=>setdescription(e.target.value)}></textarea>
          <section>
          <button className="edit-btn-p" onClick={()=>submitUpdate()}>ویرایش</button>
          <button className="delete-btn-p" onClick={()=>nav('/dashboard/manageproducts')}>بازگشت</button>
          </section>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
