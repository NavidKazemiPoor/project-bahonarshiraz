import React,{useEffect,useState} from 'react'
import { useGlobalContext_Orders } from '../../context/orderContext'
import Loading from '../../components/Loading';
import { useGlobalContext_User } from '../../context/userContext';
const MyOrders = () => {
    const {myOrders,getMyOrders,isLoading} = useGlobalContext_Orders();
    const {currentUser} = useGlobalContext_User()
    useEffect(() => {
        getMyOrders(currentUser._id)
    }, []);
    if(!myOrders || isLoading){
        return <Loading />
    }
    return (
        <div className='container'>
            <div className="center allOrderCenter">
                <table>
                    <tr>
                        <th>کد سفارش</th>
                        <th>قیمت کل</th>
                        <th>وضعیت</th>
                        <th>نام محصولات سفارش داده شده</th>
                    </tr>
                    {myOrders.map((item,index)=>{
                        return <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.total.toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,")}</td>
                            <td className={`${item.status=="pending" ? 'status-order' : 'status-suc'}`}>{item.status=="pending" ? "در حال انجام" : "تحویل داده شد" }</td>
                            <td>{item.orderItems.map((item2,index2)=>{
                            return <span key={index2}>
                                {item2.name} <br />
                            </span>
                            })}</td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
      )
}

export default MyOrders