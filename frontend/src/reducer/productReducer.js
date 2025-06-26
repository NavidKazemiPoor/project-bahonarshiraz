const reducer = (state, action) => {
  if (action.type == "loading_false") {
    return { ...state, isLoading: false };
  }
  if (action.type == "loading_true") {
    return { ...state, isLoading: true };
  }
  if (action.type == "getAllProduct") {
    return { ...state, AllProduct: action.payload };
  }
  if (action.type == "getSingleProduct") {
    return { ...state, singleProduct: action.payload };
  }

  if (action.type == "getSearchProducts") {
    console.log(action.payload);
    return { ...state,AllProduct: action.payload };
  }
  if (action.type == "clearsearch") {
    return { ...state,AllProduct: [] };
  }
  if (action.type == "rec") {
    return { ...state,AllProduct: action.payload };
  }
  if (action.type == "deleteProduct") {
    const newProduct = state.AllProduct.filter((item, index) => {
      return item._id != action.payload;
    });
    if (action.type == "editProduct") {
      const newProduct = state.AllProduct.map((item, index) => {
        if (item._id == action.payload._id) {
          return {
            ...item,
            name: action.payload.name,
            price: action.payload.price,
            category: action.payload.category,
            productImage: action.payload.productImage,
            description: action.payload.description,
          };
        }
        return item;
      });
    }

    return { ...state, AllProduct: newProduct };
  }
  return state;
};

export default reducer;
