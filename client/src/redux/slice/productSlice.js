import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

// export const getAllProducts = createAsyncThunk("product/fetchAll", async (a, { rejectWithValue }) => {
//   try {
//     const res = await axiosPrivate.get('product/client');
//     return res.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

export const getProductsOfCategory = createAsyncThunk('product/category', async (params, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`product/category/${params.id}?${params.url}`);
    return res.data;
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data });
  }
})

export const getCurrentProduct = createAsyncThunk('product/current', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`product/client/detail/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue({ status: error.response.status, data: error.response.data });
  }
})

export const getProductsForSearchBox = createAsyncThunk('product/searchbox', async (params, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`product/client/search?${params}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const getProductsForSearchPage = createAsyncThunk('product/searchpage', async (params, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`product/client/search?${params}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    isSearching: false
  },
  reducers: {},
  extraReducers: builder => {
    // GET PRODUCT OF CATEGORY
    builder.addCase(getProductsOfCategory.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getProductsOfCategory.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(getProductsOfCategory.rejected, (state, action) => {
      state.isLoading = false;
    })

    // GET CURRENT PRODUCT
    builder.addCase(getCurrentProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getCurrentProduct.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(getCurrentProduct.rejected, (state, action) => {
      state.isLoading = false;
    })

    // SEARCH BOX
    builder.addCase(getProductsForSearchBox.pending, (state, action) => {
      state.isSearching = true;
    })
    builder.addCase(getProductsForSearchBox.fulfilled, (state, action) => {
      state.isSearching = false;
    })
    builder.addCase(getProductsForSearchBox.rejected, (state, action) => {
      state.isSearching = false;
    })

    // SEARCH PAGE
    builder.addCase(getProductsForSearchPage.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getProductsForSearchPage.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(getProductsForSearchPage.rejected, (state, action) => {
      state.isLoading = false;
    })
  }
});

export default productSlice;