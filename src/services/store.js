import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { sellerApi } from "./sellerApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath] : sellerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(sellerApi.middleware)
});