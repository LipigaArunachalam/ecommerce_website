import { configureStore } from "@reduxjs/toolkit";
import { adminApi} from "../rtkQuery/adminApi";
import { authApi } from "../rtkQuery/authApi";
import { sellerApi } from "../rtkQuery/sellerApi";
import { customerApi } from "../rtkQuery/customerApi";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [sellerApi.reducerPath] : sellerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware).concat(sellerApi.middleware).concat(adminApi.middleware)
  .concat(customerApi.middleware)
});