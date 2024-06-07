import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./user/userSlice.js";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: { user: userReducer, [apiSlice.reducerPath]: apiSlice.reducer },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: true,
});

setupListeners(store.dispatch);
