import { apiSlice } from "../../api/apiSlice";


export const productApi = apiSlice.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // 1. Fetch filtered products list
    getProducts: builder.query({
      query: (params) => ({
        url: "/api/product",
        method: "GET",
        params,
      }),
      providesTags: ["Products"],
    }),

    // 2. Fetch single view item details
    getProductBySlug: builder.query({
      query: (slug) => ({
        url: `/api/product/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [{ type: "Products", id: slug }],
    }),

    // 3. Batch lookup by id references
    getProductsListByIds: builder.query({
      query: (idsArray) => ({
        url: "/api/product/list-by-ids",
        method: "POST",
        body: { ids: idsArray },
      }),
      providesTags: ["Products"],
    }),

    // 4. Toggle Product in Wishlist (Converted from Axios function to RTK Mutation)
    toggleWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/product/${productId}/wishlist`,
        method: "PATCH",
      }),
      invalidatesTags: ["Wishlist", "Products"],
    }),

    // 5. Toggle Product in Cart (Converted from Axios function to RTK Mutation)
    toggleCart: builder.mutation({
      query: (productId) => ({
        url: `/api/product/${productId}/cart`,
        method: "PATCH",
      }),
      invalidatesTags: ["Cart", "Products"],
    }),

    // 6. Update Product Counter quantities inside the cart checkout view
    updateCartQuantity: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/api/product/cart/quantity",
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 7. Core administrative / landing page deals
    getDealsOfTheDay: builder.query({
      query: () => ({
        url: "/api/product/deals-of-the-day",
        method: "GET",
      }),
      providesTags: ["Deals", "Products"],
    }),

    toggleDealStatus: builder.mutation({
      query: (productId) => ({
        url: `/api/product/toggle-deal/${productId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Deals", "Products"],
    }),
  }),
});

// Export all unified, automatically derived hook integrations
export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useGetProductsListByIdsQuery,
  useToggleWishlistMutation,
  useToggleCartMutation,
  useUpdateCartQuantityMutation,
  useGetDealsOfTheDayQuery,
  useToggleDealStatusMutation,
} = productApi;