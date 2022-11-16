import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../shared/axios/requestMethod";

export const getSuppliers = createAsyncThunk('supplier/fetchAll', async () => {
  const res = await userRequest.get("/supplier/");
  return res.data;
});

export const getCurrnetSupplier = createAsyncThunk('supplier/getcurrent', async (id) => {
  const res = await userRequest.get(`/supplier/${id}`);
  return res.data;
})

export const addSupplier = createAsyncThunk('supplier/add', async (supplier, { rejectWithValue }) => {
  try {
    const res = await userRequest.post("/supplier/create", supplier);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateSupplier = createAsyncThunk('supplier/update', async (update, { rejectWithValue }) => {
  try {
    const res = await userRequest.put(`supplier/${update.id}`, update.updatedSupplier);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteSupplier = createAsyncThunk('supplier/delete', async (id, { rejectWithValue }) => {
  try {
    const res = await userRequest.delete(`supplier/delete/${id}`);
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
    isFetching: "",
    statusSubmit: "",
    error: {}
  },
  reducers: {
    resetStatusSubmit: (state) => {
      state.statusSubmit = "";
    },
    resetErrorSku: (state) => {
      state.error.sku = "";
    }
  },
  extraReducers: (builders) => {
    // fetch all suppliers
    builders.addCase(getSuppliers.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getSuppliers.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.suppliers = action.payload;
    })
    builders.addCase(getSuppliers.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // fetch current supplier
    builders.addCase(getCurrnetSupplier.pending, (state, action) => {
      state.isFetching = "pending";
    })
    builders.addCase(getCurrnetSupplier.fulfilled, (state, action) => {
      state.isFetching = "fulfilled";
      state.currentSupplier = action.payload;
    })
    builders.addCase(getCurrnetSupplier.rejected, (state, action) => {
      state.isFetching = "rejected";
    })

    // add supplier
    builders.addCase(addSupplier.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(addSupplier.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.suppliers.push(action.payload);
    })
    builders.addCase(addSupplier.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // update supplier
    builders.addCase(updateSupplier.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(updateSupplier.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.suppliers[
        state.suppliers.findIndex((item) => item._id === action.payload._id)
      ] = action.payload;
    })
    builders.addCase(updateSupplier.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })

    // delete supplier
    builders.addCase(deleteSupplier.pending, (state, action) => {
      state.statusSubmit = "pending";
    })
    builders.addCase(deleteSupplier.fulfilled, (state, action) => {
      state.statusSubmit = "fulfilled";
      state.suppliers = state.suppliers.filter(item => {
        return item._id !== action.payload;
      });
    })

    builders.addCase(deleteSupplier.rejected, (state, action) => {
      state.statusSubmit = "rejected";
      state.error = action.payload;
    })
  }

});
export const { resetStatusSubmit, resetErrorSku } = supplierSlice.actions;
export default supplierSlice;
