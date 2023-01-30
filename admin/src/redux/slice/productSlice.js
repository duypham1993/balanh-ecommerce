import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getProducts = createAsyncThunk('product/fetchAll', async () => {
  const res = await axiosPrivate.get("/product/");
  return res.data;
});

export const getCurrentProduct = createAsyncThunk('product/getcurrent', async (id) => {
  const res = await axiosPrivate.get(`/product/${id}`);
  return res.data;
})

export const addProduct = createAsyncThunk('product/add', async (product, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/product/", product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('product/update', async ({ updatedProduct, id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`/product/${id}`, updatedProduct);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const updateStock = createAsyncThunk('product/update/stock', async (update, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put('/product/stock/', update);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`product/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: {},
    isLoading: false,
  },
  reducers: {
  },
  extraReducers: (builders) => {
    // fetch all products
    builders.addCase(getProducts.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    builders.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
    })

    // fetch current product
    builders.addCase(getCurrentProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentProduct = action.payload;
    })
    builders.addCase(getCurrentProduct.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add product
    builders.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    })

    // update product
    builders.addCase(updateProduct.fulfilled, (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // update stock 
    builders.addCase(updateStock.fulfilled, (state, action) => {
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ].qty = action.payload.qty;
    })

    // delete product
    builders.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(item => {
        return item.parentId !== action.payload && item._id !== action.payload;
      });
    })
  }

});

export default productSlice;