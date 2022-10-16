import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSucces: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailuer: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    }
  }
});

export const { loginStart, loginSucces, loginFailuer, logout } = loginSlice.actions;
export default loginSlice.reducer;