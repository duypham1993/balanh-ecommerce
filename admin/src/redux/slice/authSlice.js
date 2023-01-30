import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearLocalStorage, updateLocalAccessToken, updateLocalCurrentUser } from "../../utils/localStorage";
import axiosPrivate, { publictRequest } from "../../shared/axios/requestMethod";

export const login = createAsyncThunk('login', async (user, { rejectWithValue }) => {
  try {
    const res = await publictRequest.post("/authAdmin/login", user);
    updateLocalAccessToken(res.data.accessToken);
    updateLocalCurrentUser(res.data.currentUser);
    return res.data.currentUser;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk("logout", async (a, { rejectWithValue }) => {
  try {
    await axiosPrivate.delete("authAdmin/logout");
    clearLocalStorage();
    window.location.reload();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const updateCurrentUser = createAsyncThunk("update", async (update, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`admin/user/`, update);
    updateLocalCurrentUser(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
  },
  reducers: {},

});

export default authSlice;