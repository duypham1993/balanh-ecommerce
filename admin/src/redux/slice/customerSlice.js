import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getCustomers = createAsyncThunk('customer/fetchAll', async () => {
  const res = await axiosPrivate.get("/customer/");
  return res.data;
});

export const getCurrentCustomer = createAsyncThunk('customer/getcurrent', async (id) => {
  const res = await axiosPrivate.get(`/customer/${id}`);
  return res.data;
})

export const addCustomer = createAsyncThunk('customer/add', async (customer, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/customer/create", customer);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCustomer = createAsyncThunk('customer/update', async (update, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`customer/${update.id}`, update.updatedCustomer);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteCustomer = createAsyncThunk('customer/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`customer/delete/${id}`);
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
    isFetching: "",
    statusSubmit: "",
    error: {}
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    },
    resetErorrEmail: (state) => {
      state.error.email = "";
    }
  },
  extraReducers: (builders) => {
    // fetch all customers
    builders.addCase(getCustomers.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCustomers.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.customers = action.payload;
    })
    builders.addCase(getCustomers.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // fetch current customers
    builders.addCase(getCurrentCustomer.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCurrentCustomer.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentCustomer = action.payload;
    })
    builders.addCase(getCurrentCustomer.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add customer
    builders.addCase(addCustomer.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addCustomer.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.customers.push(action.payload);
    })
    builders.addCase(addCustomer.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // update customer
    builders.addCase(updateCustomer.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateCustomer.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.customers[
        state.customers.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateCustomer.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // delete customer
    builders.addCase(deleteCustomer.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.customers = state.customers.filter(item => {
        return item._id !== action.payload;
      });
    })
    builders.addCase(deleteCustomer.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })
  }

});
export const { resetStatusSubmit, resetErorrEmail } = customerSlice.actions;
export default customerSlice;
