import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getCustomers = createAsyncThunk('customer/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get("customer/");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCurrentCustomer = createAsyncThunk('customer/getcurrent', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`customer/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const addCustomer = createAsyncThunk('customer/add', async (customer, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("customer/", customer);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCustomer = createAsyncThunk('customer/update', async ({ udpatedCustomer, id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`customer/${id}`, udpatedCustomer);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCustomer = createAsyncThunk('customer/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`customer/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    currentCustomer: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // fetch all customers
    builders.addCase(getCustomers.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCustomers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.customers = action.payload;
    })
    builders.addCase(getCustomers.rejected, (state, action) => {
      state.isLoading = false;
    })

    // fetch current customers
    builders.addCase(getCurrentCustomer.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentCustomer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentCustomer = action.payload;
    })
    builders.addCase(getCurrentCustomer.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add customer
    builders.addCase(addCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload);
    })

    // update customer
    builders.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customers[
        state.customers.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete customer
    builders.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(item => {
        return item._id !== action.payload;
      });
    })
  }

});

export default customerSlice;
