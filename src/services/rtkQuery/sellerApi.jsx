import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sellerApi = createApi({
  reducerPath: "sellerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include"
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({

    getSellerDetails: builder.query({
      query: () => ({
        url: "/sellers",
        method: "GET"
      })
    }),

    getProducts : builder.query({
      query :()=>({
        url : "/sellers/products", 
        method:"GET",
      }),
      providesTags: ["Products"]
    }),

    deleteProduct : builder.mutation({
      query :({sid,pid})=>({
        url : `/sellers/${sid}/products/${pid}/delete`,
        method:"PATCH"
      }),
      invalidatesTags: ["Products"]
    }),

    updateProduct:builder.mutation({
      query: ({sid,pid, data})=>({
        url:`/sellers/${sid}/products/${pid}`,
        method:"PATCH",
        body: data
      }),
      invalidatesTags:["Products"]
    }),

    addProduct: builder.mutation({
      query:({sid,data})=>({
        url:`/sellers/${sid}/products`,
        method:"POST",
        body:data
      }),
      invalidatesTags:["Products"]
    }),

    orderStatus : builder.query({
      query:()=>({
        url:`/sellers/status`,
        method:"GET",
      }),
     invalidatesTags: ["Products"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ oid, status }) => ({
        url: `/orders/${oid}/${status}`,
        method: "PATCH"
  }),
  invalidatesTags: ["Products"], 
}),
})
});

export const {useGetSellerDetailsQuery, useGetProductsQuery, useDeleteProductMutation,
  useUpdateProductMutation,useAddProductMutation,useOrderStatusQuery,useUpdateOrderStatusMutation} = sellerApi;