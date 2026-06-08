import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  sortBy: 'Latest First',
};

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setSortBy } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;