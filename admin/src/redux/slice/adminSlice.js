import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getAdmins = createAsyncThunk('admin/fetchAll', async () => {
  const res = await userRequest.get("/admin/");
  return res.data;
});

export const addAdmin = createAsyncThunk('admin/add', async (admin) => {
  const res = await userRequest.post("/admin/create", admin);
  return res.data;
});

export const updateAdmin = createAsyncThunk('admin/update', async (update) => {
  const res = await userRequest.put(`admin/${update.id}`, update.updatedAdmin);
  return res.data;
});

export const deleteAdmin = createAsyncThunk('admin/delete', async (id) => {
  const res = await userRequest.delete(`admin/delete/${id}`);
  return res.data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: [],
    isFetching: "",
    statusSubmit: "",
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    }
  },
  extraReducers: (builders) => {
    // fetch all admins
    builders.addCase(getAdmins.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getAdmins.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.admins = action.payload;
    })
    builders.addCase(getAdmins.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add admin
    builders.addCase(addAdmin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addAdmin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.admins.push(action.payload);
    })
    builders.addCase(addAdmin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // update admin
    builders.addCase(updateAdmin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateAdmin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.admins[
        state.admins.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateAdmin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // delete admin
    builders.addCase(deleteAdmin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.admins = state.admins.filter(item => {
        return item._id !== action.payload;
      });
    })
    builders.addCase(deleteAdmin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })
  }

});
export const { resetStatusSubmit } = adminSlice.actions;
export default adminSlice;