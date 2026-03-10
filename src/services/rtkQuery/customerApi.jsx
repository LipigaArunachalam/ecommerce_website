import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customerApi = createApi({
  reducerPath: "customerApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include"
  }),
  tagTypes: ["customers"],
  endpoints: (builder) => ({

    getSellerDetails: builder.query({
      query: () => ({
        url: "/users",
        method: "GET"
      })
    }),
   
})
});

export const {useCustomerDetailsQuery} = customerApi;