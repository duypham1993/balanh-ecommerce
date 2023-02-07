import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, updateLocalAccessToken, updateLocalCurrentUser } from "../../utils/localStorage";
import axiosPrivate, { publictRequest } from "../../shared/axios/requestMethod";

export const register = createAsyncThunk("register", async (user, { rejectWithValue }) => {
  try {
    const res = await publictRequest.post('authClient/register', user);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const verify = createAsyncThunk("verify", async ({ id, token }, { rejectWithValue }) => {
  try {
    const res = await publictRequest.put(`authClient/verify/${id}/${token}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const login = createAsyncThunk("login", async (user, { rejectWithValue }) => {
  try {
    const res = await publictRequest.post('authClient/login', user);
    updateLocalCurrentUser(res.data.currentUser);
    updateLocalAccessToken(res.data.accessToken);
    return res.data.currentUser;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const forgotPassword = createAsyncThunk('forgot-password', async (email, { rejectWithValue }) => {
  try {
    const res = await publictRequest.post('authClient/forgot-password', email);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const checkLinkResetPW = createAsyncThunk('check-link', async ({ id, token }, { rejectWithValue }) => {
  try {
    const res = await publictRequest.get(`authClient/check-link/${id}/${token}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const resetPassword = createAsyncThunk('reset-password', async ({ id, token, password }, { rejectWithValue }) => {
  try {
    const res = await publictRequest.put(`authClient/reset/${id}/${token}`, { password: password });
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const updateUser = createAsyncThunk("auth/updateUser", async ({ id, user }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`/customer/client/${id}`, user);
    updateLocalCurrentUser(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const logout = createAsyncThunk("logout", async (a, { rejectWithValue }) => {
  try {
    await axiosPrivate.delete('authClient/logout');
    clearLocalStorage();
    window.location.reload();
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const authSlice = createSlice({
  name: "Auth",
  initialState: {
    currentUser: {},
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    })

    // update
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    // logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.currentUser = {};
    })
  }
})

export default authSlice;