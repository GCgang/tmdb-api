import { IMovie } from '../api/types';

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
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
