import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getAddresssList = createAsyncThunk('address/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get("/address/");
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCurrentAddress = createAsyncThunk('deliveryInfo/getcurrent', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`address/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addAddress = createAsyncThunk('address/add', async (address, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("address/", address);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateAddress = createAsyncThunk('address/update', async ({ updatedAddress, id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`address/${id}`, updatedAddress);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteAddress = createAsyncThunk('address/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`address/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressList: [],
    currentAddress: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // fetch all address
    builders.addCase(getAddresssList.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getAddresssList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addressList = action.payload;
    })
    builders.addCase(getAddresssList.rejected, (state, action) => {
      state.isLoading = false;
    })

    // get current address
    builders.addCase(getCurrentAddress.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentAddress = action.payload;
    })
    builders.addCase(getCurrentAddress.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add address
    builders.addCase(addAddress.fulfilled, (state, action) => {
      state.addressList.push(action.payload);
    })

    // update address
    builders.addCase(updateAddress.fulfilled, (state, action) => {
      state.addressList[
        state.addressList.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete address
    builders.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressList = state.addressList.filter(item => {
        return item._id !== action.payload;
      });
    })
  }

});

export default addressSlice;
