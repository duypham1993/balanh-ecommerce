import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest } from "../../shared/axios/requestMethod";

export const login = createAsyncThunk('login', async (user) => {
  const res = await publicRequest.post("/authAdmin/login", user);
  localStorage.setItem("currentUser", JSON.stringify(res.data));
  return res.data;
});

const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    }
  },
  extraReducers: (builders) => {
    builders.addCase(login.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(login.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentUser = action.payload;
    })
    builders.addCase(login.rejected, (state, action) => {
      state.isFetching = "fulfilled";
    })
  }
});
export const { logout } = loginSlice.actions
export default loginSlice;