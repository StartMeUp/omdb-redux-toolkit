import { MoviePosterWall, SeriesPosterWall } from "../components/PosterWall";
import { useAppSelector } from "../reduxToolkit/hooks";

const Home = () => {
  const { movieSearch, seriesSearch } = useAppSelector((state) => state.search);
  return (
    <div className="flex flex-col gap-4">
      <MoviePosterWall searchTerms={movieSearch} />
      <SeriesPosterWall searchTerms={seriesSearch} />
    </div>
  );
};

export default Home;
