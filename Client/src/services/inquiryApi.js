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

export const inquiryApi = createApi({
  reducerPath: "inquiryApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Inquiries"],
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
