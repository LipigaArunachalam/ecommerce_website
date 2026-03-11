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

    getCatalog : builder.query({
      query :()=>({
        url : "/users/4f21938f7b925dd621343fc205395145/products", 
        method:"GET",
      }),
      providesTags: ["customers"]
    }),
   
})
});

export const {useCustomerDetailsQuery, useGetCatalogQuery} = customerApi;