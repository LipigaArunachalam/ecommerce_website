import { baseApi } from "./baseApi";

export const customerApi = baseApi.injectEndpoints({
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
        params:{limit, page:(page - 1)*limit},
      }),
      providesTags: ["customers"]
    }),

    getCatalog : builder.query({
      query :({limit, page})=>({
        url : "/users/products", 
        method:"GET",
        params:{limit, page:(page - 1)*limit},
      }),
      providesTags: ["customers"]
    }),
   
})
});

export const {useCustomerDetailsQuery, useGetCatalogQuery, useGetAllProductsQuery} = customerApi;