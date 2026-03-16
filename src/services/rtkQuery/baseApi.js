import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include",
  }),
  tagTypes: ["Sellers", "customers", "Products"],
  endpoints: () => ({}),
});


// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000",
//   // prepareHeaders: (headers) => {
//   //   const token = localStorage.getItem("user_id");

//   //   if (token) {
//   //     headers.set("authorization", `Bearer ${token}`);
//   //   }

//   //   return headers;
//   // },
// });

// export const baseQueryWithAuth = async (args, api, extraOptions) => {
//   const result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     localStorage.clear();
//     window.location.href = "/";
//   }

//   return result;
// };


// export const baseApi = createApi({
//   reducerPath: "api",
//   credentials: "include",
//   tagTypes: ["Sellers", "customers", "Products"],
//   // baseQuery: baseQueryWithAuth,
//   endpoints: () => ({}),
// });