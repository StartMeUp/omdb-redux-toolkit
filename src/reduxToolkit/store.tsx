import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "./omdbApi";

export const store = configureStore({
  reducer: {
    [omdbApi.reducerPath]: omdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});
