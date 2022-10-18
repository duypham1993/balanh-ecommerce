import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isFetching: false,
    error: false,
    products: []
  },
  reducers: {
    // ADD
    addProductStart: state => {
      state.isFetching = true;
    },

    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },

    addProductFailure: state => {
      state.isFetching = false;
      state.error = true;
    },

    // GET ALL
    getProductStart: state => {
      state.isFetching = true;
    },

    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },

    getProductFailure: state => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE
    updateProductStart: state => {
      state.isFetching = true;
    },

    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.forEach(item => {
        if (item._id === action.payload._id) {
          item = action.payload;
        }
      });
    },

    updateProductFailure: state => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE
    deleteProductStart: state => {
      state.isFetching = true;
    },

    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.filter(item => item._id !== action.payload);
    },

    deleteProductFailure: state => {
      state.isFetching = false;
      state.error = true;
    },
  }
})

export const {
  addProductStart,
  addProductSuccess,
  addProductFailure,
  getProductStart,
  getProductSuccess,
  getProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure
} = productSlice.actions;

export default productSlice.reducer;