import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getAdmins = createAsyncThunk('admin/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get("/admin/");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }

});

export const getCurrentAdmin = createAsyncThunk('admin/currentadmin', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/admin/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const addAdmin = createAsyncThunk('admin/add', async (admin, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/admin/", admin);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }

});

export const updateAdmin = createAsyncThunk('admin/update', async ({ updateUser, id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`admin/${id}`, updateUser);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const deleteAdmin = createAsyncThunk('admin/delete', async (id) => {
  const res = await axiosPrivate.delete(`admin/${id}`);
  return res.data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    currentAdmin: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // fetch all admins
    builders.addCase(getAdmins.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getAdmins.fulfilled, (state, action) => {
      state.isLoading = false;
      state.admins = action.payload;
    })
    builders.addCase(getAdmins.rejected, (state, action) => {
      state.isLoading = false;
    })

    // get current admin
    builders.addCase(getCurrentAdmin.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAdmin = action.payload;
    })
    builders.addCase(getCurrentAdmin.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add admin
    builders.addCase(addAdmin.fulfilled, (state, action) => {
      state.admins.push(action.payload);
    })

    // update admin
    builders.addCase(updateAdmin.fulfilled, (state, action) => {
      state.admins[
        state.admins.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete admin
    builders.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.admins = state.admins.filter(item => {
        return item._id !== action.payload;
      });
    })
  }

});

export default adminSlice;
