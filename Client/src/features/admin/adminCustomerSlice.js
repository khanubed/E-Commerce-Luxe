import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  sortBy: "createdAt_desc",
};

const adminCustomerSlice = createSlice({
  name: "adminCustomer",
  initialState,
  reducers: {
    setCustomerSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCustomerSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetCustomerFilters: (state) => {
      state.searchQuery = "";
      state.sortBy = "createdAt_desc";
    },
  },
});

export const { 
  setCustomerSearchQuery, 
  setCustomerSortBy, 
  resetCustomerFilters 
} = adminCustomerSlice.actions;

export default adminCustomerSlice.reducer;