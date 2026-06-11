import { apiSlice } from "../../../api/apiSlice";

export const adminOverviewApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  tagTypes: ["OverviewData"],
  endpoints: (builder) => ({
    getOverviewMetrics: builder.query({
      query: () => ({ url: "/api/admin/overview", method: "GET" }),
      providesTags: ["OverviewData"],
    }),
  }),
});

export const { useGetOverviewMetricsQuery } = adminOverviewApi;
