import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getOrigin = createAsyncThunk(
  "orgin/fetchAll", async () => {
    const res = await userRequest.get("/origin");
    return res.data;
  }
)

export const addOrigin = createAsyncThunk(
  "orgin/add", async (origin) => {
    const res = await userRequest.post("/origin/create", origin);
    return res.data;
  }
)

export const updateOrigin = createAsyncThunk(
  "origin/update", async (update) => {
    const res = await userRequest.put(`/origin/${update.id}`, update.updatedOrigin);
    return res.data;
  }
)

export const deleteOrigin = createAsyncThunk(
  "origin/delete", async (id) => {
    await userRequest.delete(`origin/delete/${id}`);
    return id;
  }
)

const originSlice = createSlice({
  name: "origin",
  initialState: {
    origin: [],
    statusFetching: "",
    statusSubmit: "",
  },
  reducers: {},
  extraReducers: (builders) => {
    // get all origin
    builders.addCase(getOrigin.pending, (state, action) => {
      state.statusFetching = "pending";
    })
    builders.addCase(getOrigin.fulfilled, (state, action) => {
      state.statusFetching = "fulfilled";
      state.origin = action.payload;
    })
    builders.addCase(getOrigin.rejected, (state, action) => {
      state.statusFetching = "rejected";
    })

    // add origin
    builders.addCase(addOrigin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addOrigin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.origin.push(action.payload);
    })
    builders.addCase(addOrigin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // update origin
    builders.addCase(updateOrigin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateOrigin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.origin[
        state.origin.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateOrigin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // delete origin
    builders.addCase(deleteOrigin.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteOrigin.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.origin = state.origin.filter(item => item._id !== action.payload);
    })
    builders.addCase(deleteOrigin.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })
  }
})

export default originSlice;