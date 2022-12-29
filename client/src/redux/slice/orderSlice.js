import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getUserOrders = createAsyncThunk("order/getall", async (userId, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/order/client/${userId}`)
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCurrentOrder = createAsyncThunk("order/getCurrent", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/order/client/${id.userId}/${id.orderId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue({ data: error.response.data, status: error.response.status });
  }
})

export const createOrder = createAsyncThunk("order/create", async (order, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post('/order/client/', order);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    currentOrder: {},
    isSubmitting: false,
    isLoading: false
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // GET ALL ORDERS OF USER
    builder.addCase(getUserOrders.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
    })

    // GET CURRENT ORDER
    builder.addCase(getCurrentOrder.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getCurrentOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
    })
    builder.addCase(getCurrentOrder.rejected, (state, action) => {
      state.isLoading = false;
    })

    // CREATE ORDER
    builder.addCase(createOrder.pending, (state, action) => {
      state.isSubmitting = true;
    })
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
      state.isSubmitting = false;
    })
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isSubmitting = false;
    })
  }
})

export default orderSlice;