import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import NotFound from './NotFound';
import MovieDetail from '../components/MovieDetail';

export default function Popular() {
  const { tmdb } = useTmdbApi();
  const {
    data: popularMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['popular'],
    queryFn: () => tmdb.popular(),
  });

  if (error) return <NotFound />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {popularMovies?.map((movie) => (
            <MovieDetail key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
