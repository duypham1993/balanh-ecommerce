import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getOrigin = createAsyncThunk(
  "orgin/fetchAll", async (_, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.get("/origin");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.resonse.data);
    }
  }
)

export const addOrigin = createAsyncThunk(
  "orgin/add", async (origin, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.post("/origin", origin);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateOrigin = createAsyncThunk(
  "origin/update", async ({ updatedOrigin, id }, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.put(`/origin/${id}`, updatedOrigin);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteOrigin = createAsyncThunk(
  "origin/delete", async (id) => {
    const res = await axiosPrivate.delete(`/origin/${id}`);
    return res.data;
  }
)

const originSlice = createSlice({
  name: "origin",
  initialState: {
    origin: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // get all origin
    builders.addCase(getOrigin.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getOrigin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.origin = action.payload;
    })
    builders.addCase(getOrigin.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add origin
    builders.addCase(addOrigin.fulfilled, (state, action) => {
      console.log(action)
      state.origin.push(action.payload);
    })

    // update origin
    builders.addCase(updateOrigin.fulfilled, (state, action) => {
      state.origin[
        state.origin.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete origin
    builders.addCase(deleteOrigin.fulfilled, (state, action) => {
      state.origin = state.origin.filter(item => item._id !== action.payload);
    })
  }
})

export default originSlice;