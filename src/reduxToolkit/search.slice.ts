import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  movieSearch: string;
  seriesSearch: string;
};

const initialState: InitialState = {
  movieSearch: "Star Wars",
  seriesSearch: "Star Wars",
};

export const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMovieSearch: (state, action: PayloadAction<string>) => {
      state.movieSearch = action.payload;
    },
    setSeriesSearch: (state, action: PayloadAction<string>) => {
      state.seriesSearch = action.payload;
    },
  },
});

export default search.reducer;
export const { setMovieSearch, setSeriesSearch } = search.actions;
