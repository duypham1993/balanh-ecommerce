import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slice/loginSlice";
import productSlice from "./slice/productSlice";
import categorySlice from "./slice/categorySlice";
import originSlice from "./slice/originSlice";
import supplierSlice from "./slice/supplierSlice";
import adminSlice from "./slice/adminSlice";
import customerSlice from "./slice/customerSlice";

const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    origin: originSlice.reducer,
    supplier: supplierSlice.reducer,
    admin: adminSlice.reducer,
    customer: customerSlice.reducer
  }
})

export default store;