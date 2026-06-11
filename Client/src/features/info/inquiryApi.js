import { createApi } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../../api/apiSlice";



export const inquiryApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    submitInquiry: builder.mutation({
      query: (body) => ({ url: "/api/inquiries", method: "POST", body }),
      invalidatesTags: ["Inquiries"],
    }),
    getInquiries: builder.query({
      query: () => ({ url: "/api/inquiries", method: "GET" }),
      providesTags: ["Inquiries"],
    }),
    updateInquiry: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/inquiries/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Inquiries"],
    }),
  }),
});

export const {
  useSubmitInquiryMutation,
  useGetInquiriesQuery,
  useUpdateInquiryMutation,
} = inquiryApi;
