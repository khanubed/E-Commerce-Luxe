import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { cartReducer } from "./features/cart/cartSlice";
import { productsReducer } from "./features/products/productsSlice";
import { productApi } from "./services/productApi";
import adminOrderReducer from "./features/admin/adminOrderSlice";
import { adminOrderApi } from "./services/adminOrderApi";
import { adminCustomerApi } from "./services/adminCustomerApi";
import adminCustomerReducer from "./features/admin/adminCustomerSlice";
import adminOverviewReducer from "./features/admin/adminOverviewSlice";
import { adminOverviewApi } from "./services/adminOverviewApi";
import { homeContentApi } from "./services/homeContentApi";
import { inquiryApi } from "./services/inquiryApi";

export const store = configureStore({
  reducer: {  
    auth: authReducer,
    cart: cartReducer,
    products : productsReducer ,
    adminOrder : adminOrderReducer ,
    adminCustomer: adminCustomerReducer,
    adminOverview: adminOverviewReducer,  
    [productApi.reducerPath]: productApi.reducer,
    [adminOrderApi.reducerPath]: adminOrderApi.reducer,
    [adminCustomerApi.reducerPath]: adminCustomerApi.reducer,
    [adminOverviewApi.reducerPath]: adminOverviewApi.reducer,
    [homeContentApi.reducerPath]: homeContentApi.reducer,
    [inquiryApi.reducerPath] : inquiryApi.reducer

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, adminOrderApi.middleware, adminCustomerApi.middleware, adminOverviewApi.middleware, homeContentApi.middleware , inquiryApi.middleware),
});         