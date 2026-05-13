import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [], // Array of product objects
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        // Remove if already exists
        state.items.splice(index, 1);
      } else {
        // Add if it doesn't
        state.items.push(action.payload);
      }
      console.log(state.items);
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;