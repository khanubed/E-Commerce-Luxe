import { createApi } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { setCredentials, logoutUser } from "../features/auth/authSlice";

const baseAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true, 
});

export const axiosBaseQuery = () => async ({ url, method = "GET", body, params, headers }, api) => {
  const state = api.getState();
  const token = state.auth?.accessToken;

  const requestHeaders = { ...headers };
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }

  try {
    const result = await baseAxiosInstance({
      url,
      method,
      data: body,
      params,
      headers: requestHeaders,
    });
    
    return { data: result.data };
  } catch (axiosError) {
    const originalRequest = axiosError.config;
    if (axiosError.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const { accessToken, user } = refreshResponse.data;
        
        api.dispatch(setCredentials({ accessToken, user }));

        const retryResult = await baseAxiosInstance({
          url,
          method,
          data: body,
          params,
          headers: {
            ...requestHeaders,
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return { data: retryResult.data };
      } catch (refreshError) {
        console.error("Session expired. Auto-logging out user...", refreshError);
        api.dispatch(logoutUser());
        return {
          error: {
            status: refreshError.response?.status || 401,
            data: refreshResponse?.data || "Session Expired",
          },
        };
      }
    }

    return {
      error: {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || axiosError.message || "Network Error",
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Products", "Deals", "Cart", "Wishlist", "Orders"],
  endpoints: () => ({}),
});