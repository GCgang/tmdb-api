import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import NotFound from './NotFound';
import MovieDetail from '../components/MovieDetail';

export default function NowPlaying() {
  const { tmdb } = useTmdbApi();
  const {
    data: nowPlayingMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['nowPlaying'],
    queryFn: () => tmdb.NowPlaying(),
  });

  if (error) return <NotFound />;
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {nowPlayingMovies?.map((movie) => (
            <MovieDetail key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
