import { configureStore } from "@reduxjs/toolkit";
import { API } from "./api";

import { authApi } from "../services/authApi";
import { sellerApi } from "./sellerApi";

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath] : sellerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(sellerApi.middleware).concat(API.middleware)
});