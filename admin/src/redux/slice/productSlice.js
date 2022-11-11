import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getProducts = createAsyncThunk('product/fetchAll', async () => {
  const res = await userRequest.get("/product/");
  return res.data;
});

export const addProduct = createAsyncThunk('product/add', async (product) => {
  const res = await userRequest.post("/product/create", product);
  return res.data;
});

export const updateProduct = createAsyncThunk('product/update', async (update) => {
  const res = await userRequest.put(`product/${update.id}`, update.updatedProduct);
  return res.data;
});

export const deleteProduct = createAsyncThunk('product/delete', async (id) => {
  const res = await userRequest.delete(`product/delete/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: "",
    statusSubmit: "",
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    }
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
    })
  }

});
export const { resetStatusSubmit } = productSlice.actions;
export default productSlice;