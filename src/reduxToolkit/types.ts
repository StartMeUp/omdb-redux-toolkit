type TSearchResultShow = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type TSearchResults = {
  Search: TSearchResultShow[];
  totalResults: string;
  Response: "True" | "False";
};

type TDetailedCommon = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Response: string;
};

export type TDetailedSeries = TDetailedCommon & {
  totalSeasons: string;
  Type: "series";
};

export type TDetailedMovie = TDetailedCommon & {
  Type: "movie";
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};
