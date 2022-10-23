import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    error: false
  },
  reducers: {
    addCategoryStart: (state) => {
      state.isFetching = true;
    },
    addCategorySucces: (state, action) => {
      state.isFetching = false;
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    getCategoryStart: (state) => {
      state.isFetching = true;
    },
    getCategorySucces: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload;
    },
    getCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    updateCategoryStart: (state) => {
      state.isFetching = true;
    },
    updateCategorySucces: (state, action) => {
      state.isFetching = false;
      state.categories.forEach(item => {
        if (item._id === action.payload.__id) {
          item = action.payload;
        }
      });
    },
    updateCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    deleteCategoryStart: (state) => {
      state.isFetching = true;
    },
    deleteCategorySucces: (state, action) => {
      state.isFetching = false;
      state.categories.filter(item => item.__id !== action.payload);
    },
    deleteCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  addCategoryStart,
  addCategorySucces,
  addCategoryFailure,
  getCategoryStart,
  getCategorySucces,
  getCategoryFailure,
  updateCategoryStart,
  updateCategorySucces,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySucces,
  deleteCategoryFailure
} = categorySlice.actions;
export default categorySlice.reducer;