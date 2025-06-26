const reducer = (state, action) => {
  if (action.type == "loading_false") {
    return { ...state, isLoading: false };
  }
  if (action.type == "loading_true") {
    return { ...state, isLoading: true };
  }
  if (action.type == "allOrders") {
    return { ...state, allOrders: action.payload };
  }
  if(action.type=="myOrders"){
    console.log(action.payload);
    return { ...state, myOrders: action.payload };
  }
  return state;
};

export default reducer;
