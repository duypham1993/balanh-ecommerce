import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getCart = createAsyncThunk('cart/get', async (customerId, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/cart/${customerId
      }`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const addToCart = createAsyncThunk("cart/addtocart", async (updateCart, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post('/cart/add', updateCart);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCart = createAsyncThunk('cart/update', async (info, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put('/cart/', info);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeProductCart = createAsyncThunk("cart/removeProduct", async (info, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put('/cart/remove', info);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCart = createAsyncThunk("cart/delete", async (id, { rejectWithValue }) => {
  try {
    await axiosPrivate.delete(`cart/${id}`);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {},
    isLoading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    })
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
    })

    //UPDATE CART
    builder.addCase(updateCart.fulfilled, (state, action) => {
      const index = state.cart.products.findIndex(product => product._id === action.payload._id);
      state.cart.products[index].qty = action.payload.qty;
    });

    //ADD TO CART 
    builder.addCase(addToCart.pending, (state, action) => {
      state.isSubmitting = true;
    })
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isSubmitting = false;
      const index = state.cart.products.findIndex(product => product._id === action.payload._id);

      // if not found product in cart push product to cart
      if (index < 0) {
        state.cart.products.push(action.payload);
      } else {
        state.cart.products[index].qty += action.payload.qty;
      }
    })
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isSubmitting = false;
    })

    //REMOVE PRODUCT CART
    builder.addCase(removeProductCart.fulfilled, (state, action) => {
      state.cart.products = state.cart.products.filter(product => product._id !== action.payload);
    })

    //DELETE CART
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cart.products.length = 0;
    })
  }
});

export default cartSlice;