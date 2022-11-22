import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate, { publictRequest } from "../../shared/axios/requestMethod";

export const login = createAsyncThunk('login', async (user, { rejectWithValue }) => {
  try {
    const res = await publictRequest.post("/authAdmin/login", user);
    localStorage.setItem("currentUser", JSON.stringify(res.data.currentUser));
    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
    return res.data.currentUser;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCurrentUser = createAsyncThunk('admin/currentadmin', async (id) => {
  const res = await axiosPrivate.get(`/admin/${id}`);
  localStorage.setItem("currentUser", JSON.stringify(res.data));
  return res.data;
})

const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: {},
    isFetching: false,
    error: {}
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    },
    resetErrorValidate: (state) => {
      state.error.validate = "";
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
      state.error = action.payload;
    })

    builders.addCase(getCurrentUser.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentUser = action.payload;
    })
    builders.addCase(getCurrentUser.rejected, (state, action) => {
      state.isFetching = "fulfilled";
      state.error = action.payload;
    })
  }
});
export const { logout, resetErrorValidate } = loginSlice.actions
export default loginSlice;