import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { cartReducer } from "./features/cart/cartSlice";
import { productsReducer } from "./features/products/productsSlice";
import adminOrderReducer from "./features/admin/slice/adminOrderSlice";
import adminCustomerReducer from "./features/admin/slice/adminCustomerSlice";
import adminOverviewReducer from "./features/admin/slice/adminOverviewSlice";

import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    adminOrder: adminOrderReducer,
    adminCustomer: adminCustomerReducer,
    adminOverview: adminOverviewReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
