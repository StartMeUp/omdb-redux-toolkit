import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowTypes = {
  type: "movie" | "series";
};

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
      action: PayloadAction<{ totalPages: number } & ShowTypes>
    ) => {
      const { type, totalPages } = action.payload;
      const showType = state[type];

      // set totalPagesArray
      const tempTotalPagesArray: number[] = [];
      const maxPages = totalPages <= 100 ? totalPages : 100;
      for (let i = 1; i <= maxPages; i++) {
        tempTotalPagesArray.push(i);
      }
      showType.totalPagesArray = tempTotalPagesArray;

      // set automatically currentPagesArray first time if empty
      if (showType.currentPagesArray.length === 0) {
        if (showType.totalPagesArray.length <= 10) {
          showType.currentPagesArray = showType.totalPagesArray;
        } else {
          showType.currentPagesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
      }
    },
    setCurrentPage: (
      state,
      action: PayloadAction<{ pageNumber: number } & ShowTypes>
    ) => {
      const { type, pageNumber } = action.payload;
      const showType = state[type];
      showType.currentPage = pageNumber;
    },

    setCurrentPagesArray: (
      state,
      action: PayloadAction<
        { actionBtn: "prev" | "next"; refIndex: number } & ShowTypes
      >
    ) => {
      const { type, actionBtn, refIndex } = action.payload;
      const showType = state[type];

      if (actionBtn === "next") {
        if (
          showType.totalPagesArray[showType.totalPagesArray.length - 1] -
            refIndex >
          10
        ) {
          showType.currentPagesArray = showType.totalPagesArray.slice(
            refIndex + 1,
            refIndex + 11
          );
        } else {
          showType.currentPagesArray = showType.totalPagesArray.slice(
            refIndex + 1,
            -1
          );
        }
      }

      if (actionBtn === "prev") {
        showType.currentPagesArray;
      }
    },
  },
});

export default pagination.reducer;
export const { setTotalPagesArray, setCurrentPage, setCurrentPagesArray } =
  pagination.actions;
