interface Movie {
  id: number;
  title: string;
  description: string;
  releaseDate: string;
  posterUrl: string;
  rating: number;
  votes: number;
  tagline: string;
  runtime: number;
  languages: Array<string>;
}

export type MovieOverview = Omit<Movie, "tagline" | "runtime" | "languages">;

export default Movie;
