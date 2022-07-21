import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TSearchResults, TDetailedMovie, TDetailedSeries } from "./types";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `http://www.omdbapi.com`;

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getList: builder.query<
      TSearchResults,
      { type: "movie" | "series"; searchTerms: string; currentPage: number }
    >({
      query: (args) =>
        `/?apikey=${API_KEY}&s=${args.searchTerms}&type=${args.type}&page=${args.currentPage}`,
    }),
    getOne: builder.query<TDetailedMovie | TDetailedSeries, string>({
      query: (id) => `/?apikey=${API_KEY}&i=${id}&plot=full`,
    }),
  }),
});

export const { useGetListQuery, useGetOneQuery } = omdbApi;
