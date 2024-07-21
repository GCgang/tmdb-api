import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import NotFound from './NotFound';
import MovieDetail from '../components/MovieDetail';

export default function TopRate() {
  const { tmdb } = useTmdbApi();
  const {
    data: topRatedMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['topRated'],
    queryFn: () => tmdb.topRated(),
  });

  if (error) return <NotFound />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {topRatedMovies?.map((movie) => (
            <MovieDetail key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
