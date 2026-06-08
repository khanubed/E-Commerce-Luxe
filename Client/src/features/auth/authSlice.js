import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      console.log("user from setCredentials: ", user);
      console.log("token from setCredentials: ", accessToken);
      if (user !== undefined) {
        state.user = user;
      }
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    },

    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAddresses: (state, action) => {
      state.addresses = action.payload;

      if (state.user) {
        state.user.addresses = action.payload;
      }
    },

    setWishlistItems: (state, action) => {
      if (state.user) {
        // Creating a shallow copy of the user object with the fresh wishlist array
        state.user = {
          ...state.user,
          wishlist: action.payload,
        };
      }
    },

    setLastUsedAddress: (state, action) => {
      state.lastUsedAddressId = action.payload;
    },
    setCartItems: (state, action) => {
      if (state.user) {
        state.user.cart = action.payload;
      }
    },
    setCartItems: (state, action) => {
      if (state.user) {
        state.user.cart = action.payload; // Expects the full updated cart array from backend
      }
    },
  },
});

export const {
  setCartItems,
  setCredentials,
  logoutUser,
  setLoading,
  setAddresses,
  setLastUsedAddress,
  setWishlistItems,
} = authSlice.actions;
export default authSlice.reducer;
