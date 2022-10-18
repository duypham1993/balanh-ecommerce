import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import productReducer from "./slice/productSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    product: productReducer,
  }
})

export default store;