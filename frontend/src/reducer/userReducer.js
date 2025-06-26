const reducer = (state, action) => {
  if (action.type == "loading_false") {
    return { ...state, isLoading: false };
  }
  if (action.type == "loading_true") {
    return { ...state, isLoading: true };
  }
  if (action.type == "set_current_user") {
    // Set an item in localStorage
    localStorage.setItem("user", JSON.stringify(action.payload));

    return {
      ...state,
      currentUser: action.payload,
    };
  }
  if (action.type == "logout") {
    localStorage.removeItem("user");
    return { ...state, currentUser: null, isLoading: false, AllUser: null };
  }

  if (action.type == "set_allUser") {
    return { ...state, AllUser: action.payload };
  }
  if (action.type == "delete_user") {
    const newUser = state.AllUser.filter((item, index) => {
      return item._id != action.payload;
    });
    return { ...state, AllUser: newUser };
  }
  if (action.type == "get_singleUser") {
    return { ...state, singleUser: action.payload };
  }
  if (action.type == "clear_singleUser") {
    return { ...state, singleUser: null };
  }
  if (action.type == "change_allUser") {
    console.log(action.payload);
    const newAll = state.AllUser.filter((item, index) => {
      if (item._id == action.payload.id) {
        return {
          ...item,
          name: action.payload.name,
          password: action.payload.password,
          email: action.payload.email,
        };
      }
      return item;
    });
    return {...state,AllUser:newAll}
  }
  return state;
};

export default reducer;
