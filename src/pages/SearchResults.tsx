import { useParams } from 'react-router-dom';
import { useTmdbApi } from '../context/TmdbApiContext';
import { useQuery } from '@tanstack/react-query';
import { IMovie } from '../api/types';
import MovieSlider from '../components/MovieSlider';
import NotFound from './NotFound';

export default function SearchResults() {
  const { keyword } = useParams<{ keyword: string }>();
  const { tmdb } = useTmdbApi();
  const {
    data: searchMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['search', keyword],
    queryFn: () => tmdb.search(keyword),
    enabled: !!keyword, // keyword가 있을 때만 query 실행
  });
  if (error) return <NotFound />;
  return (
    <section>
      {error && <NotFound />}
      {isLoading && <div>Loading...</div>}
      {searchMovies && (
        <MovieSlider
          title='SEARCH RESULTS'
          type='search'
          movies={searchMovies}
        />
      )}
    </section>
  );
}
