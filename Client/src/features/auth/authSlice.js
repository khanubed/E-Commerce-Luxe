import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  addresses: JSON.parse(localStorage.getItem("user"))?.addresses || [],
  lastUsedAddressId: localStorage.getItem("lastAddressId") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.addresses = user.addresses || [];

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    setAddresses: (state, action) => {
      state.addresses = action.payload;
      if (state.user) {
        state.user.addresses = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },

    setLastUsedAddress: (state, action) => {
      state.lastUsedAddressId = action.payload;
      localStorage.setItem("lastAddressId", action.payload);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.addresses = [];
      state.lastUsedAddressId = null;

      localStorage.clear(); 
    },
  },
});

export const { login, logout, setAddresses, setLastUsedAddress } = authSlice.actions;
export default authSlice.reducer;