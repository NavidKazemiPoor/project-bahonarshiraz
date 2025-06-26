const reducer = (state, action) => {
    if (action.type == "loading_false") {
      return { ...state, isLoading: false };
    }
    if (action.type == "loading_true") {
      return { ...state, isLoading: true };
    }
   if(action.type=="getAllReviews"){
    return {...state,allReviews:action.payload}
   }
   if(action.type=="single"){
    return {...state,singleProductReview:action.payload}
   }
   if(action.type=="getMy"){
    return {...state,myReviews:action.payload}
   }
    return state;
  };
  
  export default reducer;
  