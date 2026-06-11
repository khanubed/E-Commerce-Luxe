import { apiSlice } from "../../../api/apiSlice";

export const adminCustomerApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
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
