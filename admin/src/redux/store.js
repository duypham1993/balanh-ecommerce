import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import productSlice from "./slice/productSlice";
import categorySlice from "./slice/categorySlice";
import originSlice from "./slice/originSlice";
import supplierSlice from "./slice/supplierSlice";
import adminSlice from "./slice/adminSlice";
import customerSlice from "./slice/customerSlice";
import addressSlice from "./slice/addressSlice";
import orderSlice from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,
    category: categorySlice.reducer,
    origin: originSlice.reducer,
    supplier: supplierSlice.reducer,
    admin: adminSlice.reducer,
    customer: customerSlice.reducer,
    address: addressSlice.reducer,
    order: orderSlice.reducer
  }
})

export default store;