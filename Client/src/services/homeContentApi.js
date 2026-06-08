import { createApi } from '@reduxjs/toolkit/query/react';
import API from '../api/axios'; // Custom Axios Base Instance

const axiosBaseQuery = () => async ({ url, method, body, params }) => {
  try {
    const result = await API({ url, method, data: body, params });
    const processedData = result?.data !== undefined ? result.data : result;
    return { data: processedData };
  } catch (axiosError) {
    return {
      error: {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || axiosError.message,
      },
    };
  }
};

export const homeContentApi = createApi({
  reducerPath: 'homeContentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['LandingLayout'],
  endpoints: (builder) => ({
    fetchPublicHomeContent: builder.query({
      query: () => ({ url: '/api/home-content', method: 'GET' }),
      providesTags: ['LandingLayout'],
    }),
    updateAdminHomeContent: builder.mutation({
      query: (payload) => ({
        url: '/api/admin/home-content',
        method: 'POST',
        body: payload
      }),
      invalidatesTags: ['LandingLayout'], // Triggers an automatic refresh on the storefront live view
    }),
  }),
});

export const { 
  useFetchPublicHomeContentQuery, 
  useUpdateAdminHomeContentMutation 
} = homeContentApi;