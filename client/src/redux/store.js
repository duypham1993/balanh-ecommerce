import filterRuducer from "./slice/filterSlice";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import categorySlice from "./slice/categorySlice";
import productSlice from "./slice/productSlice";
import cartSlice from "./slice/cartSlice";
import addressSlice from "./slice/addressSlice";
import orderSlice from "./slice/orderSlice";


const store = configureStore({
  reducer: {
    filter: filterRuducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    order: orderSlice.reducer
  }
});

export default store;