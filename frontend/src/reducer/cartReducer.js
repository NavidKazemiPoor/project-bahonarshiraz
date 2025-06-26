import { json } from "react-router-dom";
import { toast } from "react-toastify";
const reducer = (state, action) => {
  if (action.type == "addToCart") {
    const newCartItems = [...state.cartItems, action.payload];
    const newNum = newCartItems.length;
    let newTotal = newCartItems.reduce(function (acc, item) {
      return acc + item.price;
    }, 0);
    const newState = {
      ...state,
      cartItems: newCartItems,
      num: newNum,
      total: newTotal,
    };
    const dataString = JSON.stringify(newState);
    localStorage.setItem("cart", dataString);

    return newState;
  }
  if(action.type=="clearCart"){
    localStorage.removeItem('cart')
    return {...state,total:0,cartItems:[],num:0,isLoading:false}
  }
  if(action.type=="deleteFromCart"){
    const newCart = state.cartItems.filter((item,index)=>{
      return item.product!=action.payload
    })
    const newNum = newCart.length;
    let newTotal = newCart.reduce(function (acc, item) {
      return acc + item.price;
    }, 0);
    const newState = {...state,cartItems:newCart,total:newTotal,num:newNum}
    const dataString = JSON.stringify(newState);
    localStorage.setItem("cart", dataString);
    return newState
  }
  return state;
};

export default reducer;
