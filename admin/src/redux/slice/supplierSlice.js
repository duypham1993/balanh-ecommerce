import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../shared/axios/requestMethod";

export const getSuppliers = createAsyncThunk('supplier/fetchAll', async () => {
  const res = await axiosPrivate.get("/supplier/");
  return res.data;
});

export const getCurrentSupplier = createAsyncThunk('supplier/getcurrent', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.get(`/supplier/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const addSupplier = createAsyncThunk('supplier/add', async (supplier, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.post("/supplier", supplier);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateSupplier = createAsyncThunk('supplier/update', async ({ updateSupplier, _id }, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.put(`/supplier/${_id}`, updateSupplier);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteSupplier = createAsyncThunk('supplier/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await axiosPrivate.delete(`supplier/${id}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
    currentSupplier: {},
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builders) => {
    // fetch all suppliers
    builders.addCase(getSuppliers.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getSuppliers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.suppliers = action.payload;
    })
    builders.addCase(getSuppliers.rejected, (state, action) => {
      state.isLoading = false;
    })

    // fetch current supplier
    builders.addCase(getCurrentSupplier.pending, (state, action) => {
      state.isLoading = true;
    })
    builders.addCase(getCurrentSupplier.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentSupplier = action.payload;
    })
    builders.addCase(getCurrentSupplier.rejected, (state, action) => {
      state.isLoading = false;
    })

    // add supplier

    builders.addCase(addSupplier.fulfilled, (state, action) => {
      state.suppliers.push(action.payload);
    })

    // update supplier
    builders.addCase(updateSupplier.fulfilled, (state, action) => {
      state.suppliers[
        state.suppliers.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })

    // delete supplier
    builders.addCase(deleteSupplier.fulfilled, (state, action) => {
      state.suppliers = state.suppliers.filter(item => {
        return item._id !== action.payload;
      });
    })
  }

});
export const { resetStatusSubmit, resetErrorSku } = supplierSlice.actions;
export default supplierSlice;
