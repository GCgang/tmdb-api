import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import NotFound from './NotFound';
import MovieDetail from '../components/MovieDetail';

export default function UpComming() {
  const { tmdb } = useTmdbApi();
  const {
    data: upCommingMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['upComming'],
    queryFn: () => tmdb.upComming(),
  });

  if (error) return <NotFound />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {upCommingMovies?.map((movie) => (
            <MovieDetail key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
