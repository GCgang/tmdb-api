import { IMovie } from "../api/types";

import MovieDetail from "./MovieDetail";
interface IMovieSliderProps {
  title: string;
  isLoading: boolean;
  movies: IMovie[] | undefined;
}

export default function MovieSlider({
  title,
  isLoading,
  movies,
}: IMovieSliderProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        {movies?.map((movie) => (
          <MovieDetail key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
