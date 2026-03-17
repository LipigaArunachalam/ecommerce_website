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

    buyProduct : builder.mutation({
      query:(data)=>({
        url:`/users/buy`,
        method:"POST",
        body:data,
      }),
      invalidatesTags: ["customers"]
    }),

    cancelOrder : builder.mutation({
      query : (oid) => ({
        url : `/orders/${oid}/cancelled`,
        method : "PATCH"
      }),
      invalidatesTags : ["customers"]
    }),
   
    addToCart : builder.mutation({
      query :({uid, pid})=>({
        url : `/users/${uid}/cart/${pid}`,
        method:"POST",
      }),
      invalidatesTags:["customers"]
    }),

    cart : builder.query({
      query :()=>({
        url : "/users/cart",
        method:"GET",
      }),
      providesTags:["customers"]
    }),

    removeFromCart:builder.mutation({
      query : ({uid,pid})=>({
        url:`/users/${uid}/cart/${pid}`,
        method:"PATCH"
      }),
      invalidatesTags:["customers"]
    }),

    userDashboard: builder.query({
      query: () => ({
        url: `/users/dashboard`,
        method: "GET"
      }),
      providesTags: ["customers"],
    }),
   
    searchProduct: builder.query({
      query:({prod,limit, page})=>({
        url :`/users/catalog/${prod}`,
        method:"GET",
        params:{limit, page}
      }),
      providesTags:["customers"]
    }),

    editProfile : builder.mutation({
      query:({data, uid})=>({
        url : `/users/${uid}/edit`,
        method:"PATCH",
        body:{data}
      }),
      invalidatesTags:["customers"]
    }),

    addAddress: builder.mutation({
      query:({uid,data})=>({
        url : `/users/address/add/${uid}`,
        method:"PATCH",
        body : {data}
      }),
      invalidatesTags:["customers"]
    }),

    deleteAddress: builder.mutation({
      query:({uid,data})=>({
        url : `/users/address/delete/${uid}`,
        method:"PATCH",
        body : {data}
      }),
      invalidatesTags:["customers"]
    })
})
});

export const {useCustomerDetailsQuery, useGetCatalogQuery, useGetAllProductsQuery,useUserDashboardQuery,
  useAddToCartMutation, useCartQuery, useBuyProductMutation, useCancelOrderMutation, useRemoveFromCartMutation,
useSearchProductQuery, useEditProfileMutation, useAddAddressMutation, useDeleteAddressMutation } = customerApi;

