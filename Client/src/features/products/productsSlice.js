import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

// Thunk to fetch all products for the Shop
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (params) => {
    const response = await API.get("/api/product", {
      params,
    });

    return response.data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })

      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const productsReducer = productsSlice.reducer;
