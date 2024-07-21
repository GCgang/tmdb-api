import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import MovieSlider from '../components/MovieSlider';
import NotFound from './NotFound';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';

export default function Home() {
  const { keyword } = useParams();
  const { tmdb } = useTmdbApi();
  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    error: errorTopRated,
  } = useQuery<IMovie[]>({
    queryKey: ['topRated'],
    queryFn: () => tmdb.topRated(),
  });

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useQuery<IMovie[]>({
    queryKey: ['popular'],
    queryFn: () => tmdb.popular(),
  });

  const {
    data: upCommingMovies,
    isLoading: isLoadingUpComming,
    error: errorUpComming,
  } = useQuery<IMovie[]>({
    queryKey: ['upComming'],
    queryFn: () => tmdb.upComming(),
  });

  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying,
  } = useQuery<IMovie[]>({
    queryKey: ['nowPlaying'],
    queryFn: () => tmdb.NowPlaying(),
  });

  if (errorTopRated || errorPopular || errorUpComming || errorNowPlaying)
    return <NotFound />;
  return (
    <div>
      {keyword && keyword.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          {topRatedMovies && topRatedMovies.length > 0 && (
            <div>
              <img
                src={makeImagePath(topRatedMovies[0]?.backdrop_path || '')}
                alt={topRatedMovies[0].title}
              />
              <h3>{topRatedMovies[0].title}</h3>
              <p>{topRatedMovies[0].overview}</p>
            </div>
          )}
          <MovieSlider
            title="TOP RATE"
            isLoading={isLoadingTopRated}
            movies={topRatedMovies}
          />
          <MovieSlider
            title="POPULAR"
            isLoading={isLoadingPopular}
            movies={popularMovies}
          />
          <MovieSlider
            title="UP COMMING"
            isLoading={isLoadingUpComming}
            movies={upCommingMovies}
          />
          <MovieSlider
            title="NOW PLAYING"
            isLoading={isLoadingNowPlaying}
            movies={nowPlayingMovies}
          />
        </>
      )}
    </div>
  );
}
