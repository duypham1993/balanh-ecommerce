import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

// GET ALL ORDERS
export const getAllOrders = createAsyncThunk("orders/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get('/order');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// GET CURRENT ORDER
export const getCurrentOrder = createAsyncThunk("orders/current", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/order/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// UPDATE ORDER
export const updateOrder = createAsyncThunk("orders/update", async ({ id, status }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`/order/${id}`, status);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

// DELETE ORDER
export const deleteOrder = createAsyncThunk("order/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`/order/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: {},
    isLoading: false,
    isSubmitting: false
  },
  reducers: {},
  extraReducers: builders => {
    // GET ALL ORDERS
    builders.addCase(getAllOrders.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getAllOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    builders.addCase(getAllOrders.rejected, (state, action) => {
      state.isLoading = false;
    })

    // GET CURRENT ORDER
    builders.addCase(getCurrentOrder.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
    })
    builders.addCase(getCurrentOrder.rejected, (state, action) => {
      state.isLoading = false;
    })

    // GET CURRENT ORDER
    builders.addCase(updateOrder.pending, (state, action) => {
      state.isSubmitting = true;
    })
    builders.addCase(updateOrder.fulfilled, (state, action) => {
      state.isSubmitting = false;
      state.currentOrder = action.payload;
    })
    builders.addCase(updateOrder.rejected, (state, action) => {
      state.isSubmitting = false;
    })
  }
})

export default orderSlice;