import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import {
  setTotalPagesArray,
  setCurrentPage,
  setCurrentPagesArray,
} from "../reduxToolkit/pagination.slice";

const Pagination = ({
  totalResults,
  type,
}: {
  totalResults: string;
  type: "movie" | "series";
}) => {
  const { pagination, search } = useAppSelector((state) => state);
  const showType = pagination[type];
  const { currentPage, currentPagesArray, totalPagesArray } = showType;
  const dispatch = useAppDispatch();

  const totalPages = Math.floor(Number(totalResults) / 10) + 1;

  useEffect(() => {
    dispatch(setTotalPagesArray({ type, totalPages }));
  }, []);

  const disablePrev = totalPages <= 10 || currentPagesArray[0] === 1;
  const disableNext =
    totalPages <= 10 ||
    currentPagesArray[currentPagesArray.length - 1] === totalPages;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        disabled={disablePrev}
        className={`h-8 border border-gray-500 px-4 flex items-center justify-center ${
          disablePrev && "cursor-not-allowed opacity-80"
        }`}
      >
        Prev
      </button>
      {currentPagesArray.map((pageNumber) => {
        return (
          <div
            className={`w-8 h-8 border border-gray-500 flex items-center justify-center cursor-pointer ${
              pageNumber === currentPage && "text-black bg-white"
            }`}
            onClick={() => {
              dispatch(setCurrentPage({ type, pageNumber }));
            }}
          >
            {pageNumber}
          </div>
        );
      })}
      <button
        disabled={disableNext}
        className={`h-8 border border-gray-500 px-4 flex items-center justify-center ${
          disableNext && "cursor-not-allowed opacity-80"
        }`}
        onClick={() =>
          dispatch(
            setCurrentPagesArray({
              type,
              actionBtn: "next",
              refIndex: totalPagesArray.indexOf(currentPagesArray.slice(-1)[0]),
            })
          )
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
