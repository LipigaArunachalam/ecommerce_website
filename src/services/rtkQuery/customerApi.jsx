import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include"
  }),
  tagTypes: ["customers"],
  endpoints: (builder) => ({

    customerDetails: builder.query({
      query: () => ({
        url: "/users",
        method: "GET"
      }),
      providesTags:["customers"]
    }),

    getAllProducts : builder.query({
      query :({uid,limit, page})=>({
        url: `/users/${uid}/products`,
        method : "GET",
        Params:{limit, offset:(page - 1)*limit},
      }),
      providesTags: ["customers"]
    }),

    getCatalog : builder.query({
      query :({limit, page})=>({
        url : "/users/products", 
        method:"GET",
        Params:{limit, offset:(page - 1)*limit},
      }),
      providesTags: ["customers"]
    }),
   
})
});

export const {useCustomerDetailsQuery, useGetCatalogQuery, useGetAllProductsQuery} = customerApi;