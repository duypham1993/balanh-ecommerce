import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getCategories = createAsyncThunk('category/fetchAll', async () => {
  const res = await userRequest.get("/category/");
  return res.data;
});

export const addCategory = createAsyncThunk('category/add', async (category) => {
  const res = await userRequest.post("/category/create", category);
  return res.data;
});

export const updateCategory = createAsyncThunk('category/update', async (update) => {
  const res = await userRequest.put(`category/${update.id}`, update.updatedCategory);
  return res.data;
});

export const deleteCategory = createAsyncThunk('category/delete', async (id) => {
  const res = await userRequest.delete(`category/delete/${id}`);
  return res.data;
});

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    objectData: {},
    isFetching: "",
    statusSubmit: "",
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    }
  },
  extraReducers: (builders) => {
    // fetch all categories
    builders.addCase(getCategories.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCategories.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.categories = action.payload[0];
      state.objectData = action.payload[1];
    })
    builders.addCase(getCategories.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add category
    builders.addCase(addCategory.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addCategory.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.categories.push(action.payload);
    })
    builders.addCase(addCategory.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // update category
    builders.addCase(updateCategory.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateCategory.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.categories[
        state.categories.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateCategory.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // delete category
    builders.addCase(deleteCategory.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteCategory.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.categories = state.categories.filter(item => {
        return item.parentId !== action.payload && item._id !== action.payload;
      });
    })

    builders.addCase(deleteCategory.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })
  }

});
export const { resetStatusSubmit } = categorySlice.actions;
export default categorySlice;
