import { useParams } from "react-router-dom";
import { useGetOneQuery } from "../reduxToolkit/omdbApi";

const DetailedShow = () => {
  let { imdbID } = useParams();

  if (imdbID) {
    const { isLoading, data, isSuccess, error, isFetching } =
      useGetOneQuery(imdbID);

    return (
      <div>
        <h2>Detailed Show</h2>
        {isLoading && <p>Is Loading</p>}
        {isFetching && <p>Is Fetching</p>}
        {error && <p>{JSON.stringify(error)}</p>}
        {isSuccess && <p>{data.Title}</p>}
      </div>
    );
  }

  return <p>There was an unknown error</p>;
};

export default DetailedShow;
