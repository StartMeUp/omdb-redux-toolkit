import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import {
  setTotalPagesArray,
  setCurrentPage,
} from "../reduxToolkit/pagination.slice";

const Pagination = ({
  totalResults,
  type,
}: {
  totalResults: string;
  type: "movie" | "series";
}) => {
  const { pagination } = useAppSelector((state) => state);
  const showType = pagination[type];
  const { currentPage, currentPagesArray, totalPagesArray } = showType;
  const dispatch = useAppDispatch();

  const totalPages = Math.floor(Number(totalResults) / 10) + 1;

  useEffect(() => {
    dispatch(setTotalPagesArray({ type, totalPages }));
  }, [totalPages]);

  return (
    <div className="flex flex-wrap">
      {totalPagesArray.map((pageNumber) => {
        return (
          <div
            className={`w-8 h-8 border border-gray-500 flex items-center justify-center gap-2 cursor-pointer ${
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
    </div>
  );
};

export default Pagination;
