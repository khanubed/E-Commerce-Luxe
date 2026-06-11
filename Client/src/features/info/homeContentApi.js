
import { apiSlice } from '../../api/apiSlice';



export const homeContentApi = apiSlice.injectEndpoints({
  overrideExisting: false,
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