import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const checkSlug = createAsyncThunk('category/checkSlug', async (check, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/category/check", check);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const getCategories = createAsyncThunk('category/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get("/category/");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addCategory = createAsyncThunk('category/add', async (category, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/category/", category);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCategory = createAsyncThunk('category/update', async ({ updatedCategory, id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`/category/${id}`, updatedCategory);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCategory = createAsyncThunk('category/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`category/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }

});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    treeCategories: {},
    currentCategory: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // fetch all categories
    builders.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.treeCategories = action.payload.treeCategories;
    })
    builders.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add category
    builders.addCase(addCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload);
    })

    // update category
    builders.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories[
        state.categories.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete category

    builders.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(item => {
        return item.parentId !== action.payload && item._id !== action.payload;
      });
    })
  }

});

export default categorySlice;
