import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaginationStates = {
  totalPagesArray: number[];
  currentPage: number;
  currentPagesArray: number[];
};

type InitialState = {
  movie: PaginationStates;
  series: PaginationStates;
};

const initialState: InitialState = {
  movie: {
    totalPagesArray: [],
    currentPage: 1,
    currentPagesArray: [],
  },
  series: {
    totalPagesArray: [],
    currentPage: 1,
    currentPagesArray: [],
  },
};

export const pagination = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalPagesArray: (
      state,
      action: PayloadAction<{
        type: "movie" | "series";
        totalPages: number;
      }>
    ) => {
      const { type, totalPages } = action.payload;
      const tempTotalPagesArray: number[] = [];
      for (let i = 1; i <= (totalPages <= 100 ? totalPages : 100); i++) {
        tempTotalPagesArray.push(i);
      }
      state[type].totalPagesArray = tempTotalPagesArray;
    },
    setCurrentPage: (
      state,
      action: PayloadAction<{
        type: "movie" | "series";
        pageNumber: number;
      }>
    ) => {
      const { type, pageNumber } = action.payload;
      state[type].currentPage = pageNumber;
    },
  },
});

export default pagination.reducer;
export const { setTotalPagesArray, setCurrentPage } = pagination.actions;
