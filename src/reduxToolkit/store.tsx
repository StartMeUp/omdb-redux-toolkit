import { configureStore } from "@reduxjs/toolkit";
import { omdbApi } from "./omdbApi";
import searchReducer from "./search.slice";

export const store = configureStore({
  reducer: {
    [omdbApi.reducerPath]: omdbApi.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
