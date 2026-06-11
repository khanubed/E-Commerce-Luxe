import { apiSlice } from "../../../api/apiSlice";


export const adminOrderApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  tagTypes: ["Orders", "Stats"],
  endpoints: (builder) => ({
    getAdminOrders: builder.query({
      query: ({ status, page, search, sort }) => ({
        url: "/api/admin/orders",
        method: "GET",
        params: {
          status: status !== "all" ? status : undefined,
          page,
          search: search || undefined,
          sort,
        },
      }),
      providesTags: ["Orders"],
    }),
    getAdminOrderStats: builder.query({
      query: () => ({
        url: "/api/admin/orders/stats",
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders", "Stats"],
    }),
  }),
});

export const {
  useGetAdminOrdersQuery,
  useGetAdminOrderStatsQuery,
  useUpdateOrderStatusMutation,
} = adminOrderApi;
