import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    credentials: "include"
  }),

  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      })
    }),

    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data
      })
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data
      })
    }),

    resetPassword: builder.mutation({
      query: ({email, newPassword, token}) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: {email, newPassword, token}
      })
    })

  })
});

export const { useLoginMutation, useSignupMutation, useForgotPasswordMutation, useResetPasswordMutation} = authApi;