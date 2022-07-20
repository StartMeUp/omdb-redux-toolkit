import { useParams } from "react-router-dom";
import { useGetOneQuery } from "../reduxToolkit/omdbApi";
import UnResolvedQuery from "./UnResolvedQuery";
import NoPicture from "../assets/img/no_picture_available.png";

const DetailedShow = () => {
  let { imdbID } = useParams();

  if (imdbID) {
    const { isLoading, data, isSuccess, error } = useGetOneQuery(imdbID);

    if (isLoading) return <UnResolvedQuery text="Loading ..." />;

    if (error)
      return (
        <UnResolvedQuery text="An error has occured while fetching data" />
      );

    if (isSuccess) {
      const { Poster, Title, Year, imdbID, Plot, imdbRating } = data;
      const dataDetails = Object.entries({
        Title,
        Year,
        imdbID,
        Plot,
        imdbRating,
      });
      const roundRating = Math.round(Number(imdbRating));
      const rating: any[] = [];
      for (let i = 1; i <= 10; i++) {
        i <= roundRating ? rating.push("\u2605") : rating.push("\u2606");
      }

      return (
        <div className=" flex flex-col gap-4 sm:flex-row max-w-4xl mx-auto">
          <img
            src={Poster !== "N/A" ? Poster : NoPicture}
            className="sm:aspect-[2/3] sm:object-cover sm:grow-[1]"
          />
          <div className="sm:grow-[2]">
            {dataDetails.map((detail) => {
              const dataKey = detail[0];
              const value = detail[1];

              return (
                <p className="p-4 border-b border-b-gray-500 first:border-t first:border-t-gray-500">
                  <span className="uppercase font-bold">{dataKey} : </span>{" "}
                  {dataKey !== "imdbRating" && <>{value}</>}
                  {dataKey === "imdbRating" && (
                    <>
                      {rating.map((star) => (
                        <span
                          className={star === "\u2605" ? "text-yellow-500" : ""}
                        >
                          {star}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              );
            })}
          </div>
        </div>
      );
    }
  }

  return <UnResolvedQuery text="unknown error" />;
};

export default DetailedShow;
