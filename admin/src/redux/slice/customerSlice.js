import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getCustomers = createAsyncThunk('customer/fetchAll', async () => {
  const res = await userRequest.get("/customer/");
  return res.data;
});

export const addCustomer = createAsyncThunk('customer/add', async (customer) => {
  const res = await userRequest.post("/customer/create", customer);
  return res.data;
});

export const updateCustomer = createAsyncThunk('customer/update', async (update) => {
  const res = await userRequest.put(`customer/${update.id}`, update.updatedCustomer);
  return res.data;
});

export const deleteCustomer = createAsyncThunk('customer/delete', async (id) => {
  const res = await userRequest.delete(`customer/delete/${id}`);
  return res.data;
});

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
    isFetching: "",
    statusSubmit: "",
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
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
    })
  }

});
export const { resetStatusSubmit } = customerSlice.actions;
export default customerSlice;
