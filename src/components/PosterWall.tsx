import { useGetListQuery } from "../reduxToolkit/omdbApi";
import { Link } from "react-router-dom";

const PosterWall = ({
  type,
  searchTerms = "star wars",
}: {
  type: "movie" | "series";
  searchTerms: string;
}) => {
  const { isLoading, data, isSuccess, error, isFetching } = useGetListQuery({
    type,
    searchTerms,
  });
  return (
    <div>
      <h2>PosterWall</h2>
      {isLoading && <p>Is Loading</p>}
      {isFetching && <p>Is Fetching</p>}
      {error && <p>{JSON.stringify(error)}</p>}
      {isSuccess &&
        data.Search.map((show) => (
          <p>
            {show.Title}, <Link to={show.imdbID}>{show.imdbID}</Link>
          </p>
        ))}
    </div>
  );
};

export default PosterWall;
