// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

// export default API;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), 
  tagTypes: ['Sellers'],
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: ({limit = 10, page =1}) => ({
        url: '/admin/sellers',
        method: 'GET',
        params: {limit, offset: (page - 1) * limit}, 
      }),
      providesTags: ['Sellers'],
    }),
    getAllCustomer: builder.query({ 
      query: ( {limit= 10, page = 1} ) => ({
        url: '/admin/customers',
        method: 'GET',
        params: {limit, offset:(page -1) * limit} 
      }),
    }),
    deleteSeller: builder.mutation({
      query:(id) => ({
        url:`/admin/sellers/delete/${id}`,
        method: 'PATCH',
        
      }),
      invalidatesTags: ['Sellers'],
    }),
    addSeller: builder.mutation({
      query:(newSeller) => ({
        url:'/admin/sellers',
        method: 'POST',
        body: newSeller,
      }),
      invalidatesTags: ['Sellers']
    })
  }),
}); 

export const { useGetAllSellerQuery, useGetAllCustomerQuery, useDeleteSellerMutation, useAddSellerMutation } = API;