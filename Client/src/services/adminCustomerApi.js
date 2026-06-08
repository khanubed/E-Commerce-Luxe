import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../api/axios";

const axiosBaseQuery = () => async ({ url, method, body, params, headers }) => {
  try {
    const result = await API({
      url,
      method,
      data: body,
      params,
      headers,
    });
    return { data: result.data };
  } catch (axiosError) {
    let err = axiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const adminCustomerApi = createApi({
  reducerPath: "adminCustomerApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Customers"],
  endpoints: (builder) => ({
    // Query fetching paginated and filtered data logs
    getAdminCustomers: builder.query({
      query: ({ segment, page, search }) => ({
        url: "/api/admin/users",
        method: "GET",
        params: { segment, page, search },
      }),
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetAdminCustomersQuery } = adminCustomerApi;