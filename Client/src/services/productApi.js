import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../api/axios";

const axiosBaseQuery =
  () =>
  async ({ url, method = "GET", body, params, headers }) => {
    try {
      const result = await API({
        url,
        method,
        data: body,
        params,
        headers,
      });

      // Handle cases where an interceptor might have already unwrapped result.data
      let processedData = result;
      if (result && Object.prototype.hasOwnProperty.call(result, "data")) {
        processedData = result.data;
      }

      console.log("=== AXIOS BASE QUERY SUCCESS CAPTURE ===", processedData);
      return { data: processedData };
    } catch (axiosError) {
      console.error("=== AXIOS BASE QUERY CATCH BLOCK ===", axiosError);
      return {
        error: {
          status: axiosError.response?.status || 500,
          data:
            axiosError.response?.data ||
            axiosError.message ||
            "Axios Request Failed",
        },
      };
    }
  };

export const productApi = createApi({
  reducerPath: "productApi",

  // 🚨 FIXED: Executed the function factory correctly here
  baseQuery: axiosBaseQuery(),

  tagTypes: ["Products"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({
        page = 1,
        limit = 24,
        search = "",
        category = "",
        sort = "",
      }) => ({
        url: "/api/product",
        method: "GET",
        params: {
          page,
          limit,
          search,
          category,
          sort,
        },
      }),
      providesTags: ["Products"],
    }),

    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/api/product/${slug}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    getProductsListByIds: builder.query({
      query: (ids) => ({
        url: "/api/product/list-by-ids",
        method: "POST",
        body: { ids },
      }),
      providesTags: ["Products"],
    }),

    toggleDealStatus: builder.mutation({
      query: (productId) => ({
        url: `/api/product/toggle-deal/${productId}`,
        method: "PATCH",
      }),
      // 🔄 Automatically forces 'getProducts' to auto-refetch the fresh server list state
      invalidatesTags: ["Products"],
    }),
    getDealsOfTheDay: builder.query({
      query: () => ({
        url: "/api/product/deals-of-the-day",
        method: "GET",
      }),
      providesTags: ["Deals", "Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useToggleDealStatusMutation,
  useGetDealsOfTheDayQuery
} = productApi;
