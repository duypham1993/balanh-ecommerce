import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getAddresssList = createAsyncThunk('deliveryInfo/fetchAll', async () => {
  const res = await userRequest.get("/deliveryInfo/");
  return res.data;
});

export const getCurrentAddress = createAsyncThunk('deliveryInfo/getcurrent', async (id) => {
  const res = await userRequest.get(`/deliveryInfo/${id}`);
  return res.data;
});

export const addAddress = createAsyncThunk('deliveryInfo/add', async (deliveryInfo) => {
  const res = await userRequest.post("/deliveryInfo/create", deliveryInfo);
  return res.data;
});

export const updateAddress = createAsyncThunk('deliveryInfo/update', async (update) => {
  console.log(update)
  const res = await userRequest.put(`deliveryInfo/${update.id}`, update.updatedAddress);
  return res.data;
});

export const deleteAddress = createAsyncThunk('deliveryInfo/delete', async (id) => {
  const res = await userRequest.delete(`deliveryInfo/delete/${id}`);
  return res.data;
});

const deliveryInfoSlice = createSlice({
  name: "deliveryInfo",
  initialState: {
    addressList: [],
    currentAdrress: {},
    isFetching: "",
    statusSubmit: "",
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    }
  },
  extraReducers: (builders) => {
    // fetch all deliveryInfo
    builders.addCase(getAddresssList.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getAddresssList.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.addressList = action.payload;
    })
    builders.addCase(getAddresssList.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // get current address
    builders.addCase(getCurrentAddress.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCurrentAddress.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentAdrress = action.payload;
    })
    builders.addCase(getCurrentAddress.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add deliveryInfo
    builders.addCase(addAddress.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addAddress.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.addressList.push(action.payload);
    })
    builders.addCase(addAddress.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // update deliveryInfo
    builders.addCase(updateAddress.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateAddress.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.addressList[
        state.addressList.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateAddress.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })

    // delete deliveryInfo
    builders.addCase(deleteAddress.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteAddress.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.addressList = state.addressList.filter(item => {
        return item._id !== action.payload;
      });
    })
    builders.addCase(deleteAddress.rejected, (state, action) => {
      state.statusSubmit = "rejected";
    })
  }

});
export const { resetStatusSubmit } = deliveryInfoSlice.actions;
export default deliveryInfoSlice;
