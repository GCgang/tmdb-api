import { useQuery } from '@tanstack/react-query';
import { IMovie } from '../api/types';
import { useTmdbApi } from '../context/TmdbApiContext';

export function useMovies(
  type: 'popular' | 'topRated' | 'nowPlaying' | 'upComming'
) {
  const { tmdb } = useTmdbApi();

  const fetchMovies = (): Promise<IMovie[]> => {
    switch (type) {
      case 'popular':
        return tmdb.popular();
      case 'topRated':
        return tmdb.topRated();
      case 'nowPlaying':
        return tmdb.nowPlaying();
      case 'upComming':
        return tmdb.upComming();
      default:
        throw new Error('Invalid movie type');
    }
  };

  return useQuery<IMovie[]>({
    queryKey: [type],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5,
  });
}
