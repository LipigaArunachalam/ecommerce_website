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
  endpoints: (builder) => ({
    getAllSeller: builder.query({
      query: (data) => ({
        url: '/admin/sellers',
        method: 'GET',
        body: data, 
      }),
    }),
    getAllCustomer: builder.query({ 
      query: ( {limit= 10, page = 1} ) => ({
        url: '/admin/customers',
        method: 'GET',
        params: {limit, offset:(page -1) * limit} 
      }),
    })
  }),
}); 

export const { useGetAllSellerQuery, useGetAllCustomerQuery } = API;