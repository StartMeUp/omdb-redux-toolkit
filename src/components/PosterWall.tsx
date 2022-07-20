import { useGetListQuery } from "../reduxToolkit/omdbApi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../reduxToolkit/hooks";
import { useState } from "react";
import { setMovieSearch, setSeriesSearch } from "../reduxToolkit/search.slice";
import UnResolvedQuery from "./UnResolvedQuery";
import Pagination from "./Pagination";
import NoPicture from "../assets/img/no_picture_available.png";

const PosterTile = ({
  posterUrl,
  title,
  year,
  imdbID,
}: {
  posterUrl: string;
  title: string;
  year: string;
  imdbID: string;
}) => {
  return (
    <Link to={imdbID}>
      <div className="bg-gray-700 flex flex-col p-4 gap-2 rounded hover:scale-110 hover:shadow-xl hover:shadow-gray-500 transition-all">
        <img
          src={posterUrl !== "N/A" ? posterUrl : NoPicture}
          className="aspect-[2/3] object-cover"
        />
        <h3 className="text-xl">{title}</h3>
        <span className="text-lg">{year}</span>
      </div>
    </Link>
  );
};

const PosterWall = ({
  type,
  searchTerms,
}: {
  type: "movie" | "series";
  searchTerms: string;
}) => {
  const { isLoading, data, isSuccess, error } = useGetListQuery({
    type,
    searchTerms,
  });

  const { movieSearch, seriesSearch } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const category =
    type[type.length - 1] === "s"
      ? type.toUpperCase()
      : type.toUpperCase() + "S";

  const [searchInputValue, setSearchInputValue] = useState(
    type === "movie" ? movieSearch : seriesSearch
  );

  const searchInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInputValue(e.target.value);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (type === "movie") {
      dispatch(setMovieSearch(searchInputValue));
    } else {
      dispatch(setSeriesSearch(searchInputValue));
    }
  };

  if (isLoading) return <UnResolvedQuery text="Loading data ..." />;

  if (error)
    return <UnResolvedQuery text="An error has occured in retrieving data" />;

  if (isSuccess)
    return (
      <div>
        <form
          onSubmit={onSubmit}
          className="flex items-center py-4 mb-4 border-b border-b-gray-400 gap-4"
        >
          <h2 className="text-2xl">{category}</h2>
          <input
            className="rounded p-2 text-gray-800"
            type="text"
            value={searchInputValue}
            onChange={searchInputOnChange}
          />
          <button
            type="submit"
            className="border border-gray-400 py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>

        <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-4">
          {data.Search.map((show) => {
            const { Title, imdbID, Year, Poster } = show;
            return (
              <PosterTile
                title={Title}
                imdbID={imdbID}
                posterUrl={Poster}
                year={Year}
                key={imdbID}
              />
            );
          })}
        </div>

        <Pagination totalResults={data.totalResults} />
      </div>
    );

  return <UnResolvedQuery text="unknown error" />;
};

export const MoviePosterWall = ({ searchTerms }: { searchTerms: string }) => (
  <PosterWall type="movie" searchTerms={searchTerms} />
);

export const SeriesPosterWall = ({ searchTerms }: { searchTerms: string }) => (
  <PosterWall type="series" searchTerms={searchTerms} />
);
