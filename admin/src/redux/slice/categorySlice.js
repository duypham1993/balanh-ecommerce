import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    error: false
  },
  reducers: {
    categoryStart: (state) => {
      state.isFetching = true;
    },
    categorySucces: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    categoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const { categoryStart, categorySucces, categoryFailure } = categorySlice.actions;
export default categorySlice.reducer;