import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { publictRequest } from "../../shared/axios/requestMethod"

export const getCategories = createAsyncThunk("category/fetchAll", async (a, { rejectWithValue }) => {
  try {
    const res = await publictRequest.get("category/client");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    treeCategories: []
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL CATEGORIES 
    builder.addCase(getCategories.pending, (state, aciton) => {
      state.isLoading = true;
    })
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.treeCategories = action.payload.treeCategories.children;
    })
    builder.addCase(getCategories.rejected, (state, aciton) => {
      state.isLoading = false;
    })
  }
});

export default categorySlice;