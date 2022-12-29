import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosPrivate from "../../shared/axios/requestMethod";

// GET USER ADDRESS LIST
export const getAddressList = createAsyncThunk('address/getlist', async (customerID, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`address/client/${customerID}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// CREATE ADDRESS
export const createAddress = createAsyncThunk('address/create', async (deliveryAddress, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post('address/client', deliveryAddress);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk('address/update', async (deliveryAddress, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put("/address/client", deliveryAddress);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk('address/delete', async (addressID, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`/address/client/${addressID}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addressList: [],
    selectedAddress: {},
    isLoading: false,
    isSubmitting: false
  },
  reducers: {
    chooseAddress: (state, action) => {
      state.selectedAddress = state.addressList.filter(address => address._id === action.payload)[0];
    }
  },
  extraReducers: (builder) => {
    // GET USER ADDRESS LIST
    builder.addCase(getAddressList.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(getAddressList.fulfilled, (state, action) => {
      state.addressList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAddressList.rejected, (state, action) => {
      state.isLoading = false;
    })

    // CREATE ADDRESS
    builder.addCase(createAddress.pending, (state, action) => {
      state.isSubmitting = true;
    })
    builder.addCase(createAddress.fulfilled, (state, action) => {
      if (action.payload.isDefault) {
        state.addressList = state.addressList.map(address => {
          address.isDefault = false;
          return address;
        });
      }
      state.addressList.push(action.payload);
      state.isSubmitting = false;
    })
    builder.addCase(createAddress.rejected, (state, action) => {
      state.isSubmitting = false;
    })

    // UPDATE ADDRESS
    builder.addCase(updateAddress.pending, (state, action) => {
      state.isSubmitting = true;
    })
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      if (action.payload.isDefault) {
        state.addressList = state.addressList.map(address => {
          address.isDefault = false;
          return address;
        });
      }

      state.addressList = state.addressList.map(address => {
        if (address._id === action.payload._id) {
          address = action.payload;
        }
        return address;
      });
      state.isSubmitting = false;
    })
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.isSubmitting = false;
    })

    // DELETE ADDRESS
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressList = state.addressList.filter(address => address._id !== action.payload);
    })
  }
});
export const { chooseAddress, resetStatusSubmit } = addressSlice.actions;
export default addressSlice;