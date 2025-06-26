import React, { useState,useEffect } from 'react'
import { useGlobalContext_Product } from '../../context/productContext';
import Loading from './../../components/Loading'
import { useNavigate } from 'react-router-dom';
const ManageProducts = () => {
    const [click,setClick] = useState(false);
    const [category,setCategory] = useState('لپ تاپ')
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [img,setImg] = useState('');
    const [description,setdescription] = useState('');
    const {createProduct,getAllProducts,AllProduct,isLoading,deleteProduct} = useGlobalContext_Product();
    const nav = useNavigate();
    useEffect(() => {
     getAllProducts();
     console.log('ok');
    }, []);
    if(!AllProduct || isLoading){
        return <Loading />
    }
    
  return (
    <div className='container manageproduct-container'>
        <div className="center manageproduct-center">
            <div className="manageproduct-top">
                {/* {click ? <button onClick={()=>setClick(!click)}>افزودن</button> : <button onClick={()=>setClick(!click)}>افزودن محصول جدید</button>    } */}
                <button onClick={()=>createProduct({name,price,productImage:img,category,description})}>افزودن محصول جدید</button>    
                <div className="add-product-box">
                    <div className="add-product-box1">
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder='نام محصول' />
                    <input type="text" onChange={(e)=>setPrice(e.target.value)} placeholder='قیمت محصول' />
                    <input type="file" onChange={(e)=>setImg(e.target.files[0])} placeholder='تصویر محصول' />
                    <select name="category" id="category" defaultValue='لپ تاپ' onChange={(e)=>setCategory(e.target.value)}>
                        <option value="کنسول">کنسول بازی</option>
                        <option value="کامپیوتر">کامپیوتر</option>
                        <option value="لپ تاپ" defaultChecked="true">لپ تاپ</option>
                    </select>
                    
                    </div>
                    <div className="add-product-2">
                        <textarea name="text" onChange={(e)=>setdescription(e.target.value)} placeholder='توضیحات' id="text"></textarea>
                    </div>
          
                </div>
            </div>
            <div className="manageproduct-all">
                {AllProduct.map((item,index)=>{
                    return     <div key={index} className="single-product-dash">
                        <img src={`${process.env.REACT_APP_API}/${item.productImage}`} alt="" />
                        <h3>نام محصول: {item.name}</h3>
                        <h4>دسته بندی محصول: {item.category}</h4>
                        <h4>قیمت محصول: {item.price.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")} - تومان</h4>
                        <p>توصیحات محصول: {item.description || 'ندارد'}</p>
                        <button onClick={()=>nav(`/dashboard/editproduct/${item._id}`)} className='edit-btn-p'>ویرایش</button>
                        <button className='delete-btn-p' onClick={()=>deleteProduct(item._id)}>حذف</button>
                    </div>
                })}
            
            </div>
        </div>
    </div>
  )
}

export default ManageProducts