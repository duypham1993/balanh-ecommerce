import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { clearLocalStorage, updateLocalAccessToken, updateLocalCurrentUser } from "../../services/localStorage";
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
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const updateCurrentUser = createAsyncThunk("update", async (update, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`admin/user/${update.userID}`, update.updatedAdmin);
    updateLocalCurrentUser(res.data);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const getCurrentUser = createAsyncThunk('admin/currentadmin', async (id) => {
  const res = await axiosPrivate.get(`/admin/${id}`);
  updateLocalCurrentUser(res.data);
  return res.data;
})

const loginSlice = createSlice({
  name: "login",
  initialState: {
    currentUser: {},
    isFetching: false,
    statusSubmit: "",
    error: {}
  },
  reducers: {
    resetErrorValidate: (state) => {
      state.error.validate = "";
    },
    resetErrorPassword: (state) => {
      state.error.password = "";
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
      state.isFetching = "rejected";
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
      state.isFetching = "rejected";
      state.error = action.payload;
    })

    builders.addCase(updateCurrentUser.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.currentUser = action.payload;
    })
    builders.addCase(updateCurrentUser.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    builders.addCase(logout.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(logout.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentUser = {};
    })
    builders.addCase(logout.rejected, (state, action) => {
      state.isFetching = "rejected";
      state.error = action.payload;
    })
  }
});
export const { resetErrorValidate, resetErrorPassword } = loginSlice.actions
export default loginSlice;