import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice";
import productSlice from "./slice/productSlice";
import categorySlice from "./slice/categorySlice";
import originSlice from "./slice/originSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    origin: originSlice.reducer,
  }
})

export default store;