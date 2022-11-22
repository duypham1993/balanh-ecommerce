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
    const res = await axiosPrivate.post("/product/create", product);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateProduct = createAsyncThunk('product/update', async (update, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`product/${update.id}`, update.updatedProduct);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
});

export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`product/delete/${id}`);
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
    isFetching: "",
    statusSubmit: "",
    error: {}
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    },
    resetErrorSku: (state) => {
      state.error.sku = "";
    },
  },
  extraReducers: (builders) => {
    // fetch all products
    builders.addCase(getProducts.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getProducts.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.products = action.payload;
    })
    builders.addCase(getProducts.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // fetch current product
    builders.addCase(getCurrentProduct.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCurrentProduct.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentProduct = action.payload;
    })
    builders.addCase(getCurrentProduct.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add product
    builders.addCase(addProduct.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addProduct.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.products.push(action.payload);
    })
    builders.addCase(addProduct.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // update product
    builders.addCase(updateProduct.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateProduct.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.products[
        state.products.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateProduct.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // delete product
    builders.addCase(deleteProduct.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteProduct.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.products = state.products.filter(item => {
        return item.parentId !== action.payload && item._id !== action.payload;
      });
    })

    builders.addCase(deleteProduct.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })
  }

});
export const { resetStatusSubmit, resetErrorSku } = productSlice.actions;
export default productSlice;