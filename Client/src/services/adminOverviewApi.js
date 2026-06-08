import { createApi } from "@reduxjs/toolkit/query/react";
import API from "../api/axios";

const axiosBaseQuery =
  () =>
  async ({ url, method, body, params, headers }) => {
    try {
      const result = await API({
        url,
        method,
        data: body,
        params,
        headers,
      });

      // 🚨 FIX: Safely fallback if your axios file already strips away the top 'data' wrapper
      const processedData = result?.data !== undefined ? result.data : result;

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

export const adminOverviewApi = createApi({
  reducerPath: "adminOverviewApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["OverviewData"],
  endpoints: (builder) => ({
    getOverviewMetrics: builder.query({
      query: () => ({ url: "/api/admin/overview", method: "GET" }),
      providesTags: ["OverviewData"],
    }),
  }),
});

export const { useGetOverviewMetricsQuery } = adminOverviewApi;
