import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    isActive: false,
    ariaExpaned: false
  },
  reducers: {
    collapse: (state) => {
      state.ariaExpaned = !state.ariaExpaned;
    }
  }
})


export const { collapse } = filterSlice.actions;
export default filterSlice.reducer;