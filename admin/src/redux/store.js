import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import productReducer from "./slice/productSlice";
import categoryReducer from "./slice/categorySlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
    category: categoryReducer,
  }
})

export default store;