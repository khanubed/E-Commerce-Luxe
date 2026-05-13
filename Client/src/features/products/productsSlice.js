import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch all products for the Shop
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=0",
    );
    console.log(response.data);
    return response.data.products;
  },
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
