import { createApi } from '@reduxjs/toolkit/query/react';
import API from '../api/axios';

const  axiosBaseQuery = () => async ({ url, method, body, params, headers }) => {
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

export const adminOrderApi = createApi({
  reducerPath: 'adminOrderApi',
  baseQuery: axiosBaseQuery(), 
  tagTypes: ['Orders', 'Stats'],
  endpoints: (builder) => ({
    getAdminOrders: builder.query({
      query: ({ status, page, search, sort }) => ({
        url: '/api/admin/orders', 
        method: 'GET',
        params: { 
          status: status !== 'all' ? status : undefined, 
          page, 
          search: search || undefined,
          sort 
        },
      }),
      providesTags: ['Orders'],
    }),
    getAdminOrderStats: builder.query({
      query: () => ({
        url: '/api/admin/orders/stats',
        method: 'GET',
      }),
      providesTags: ['Stats'],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/admin/orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Orders', 'Stats'],
    }),
  }),
});

export const {
  useGetAdminOrdersQuery,
  useGetAdminOrderStatsQuery,
  useUpdateOrderStatusMutation,
} = adminOrderApi;