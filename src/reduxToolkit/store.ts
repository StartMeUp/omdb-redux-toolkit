import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "./omdbApi";
import searchReducer from "./search.slice";
import paginationReducer from "./pagination.slice";

export const store = configureStore({
  reducer: {
    [omdbApi.reducerPath]: omdbApi.reducer,
    search: searchReducer,
    pagination: paginationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
