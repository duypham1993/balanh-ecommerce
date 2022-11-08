import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice";
import productSlice from "./slice/productSlice";
import categorySlice from "./slice/categorySlice";
import originSlice from "./slice/originSlice";
import supplierSlice from "./slice/supplierSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    origin: originSlice.reducer,
    supplier: supplierSlice.reducer,
  }
})

export default store;