import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import MovieSlider from '../components/MovieSlider';

interface Backdrop {
  file_path: string;
}

export default function Home() {
  const { keyword } = useParams();
  const { tmdb } = useTmdbApi();
  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    error: errorTopRated,
  } = useQuery({ queryKey: ['topRated'], queryFn: () => tmdb.topRated() });

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useQuery({ queryKey: ['popular'], queryFn: () => tmdb.popular() });

  const {
    data: upCommingMovies,
    isLoading: isLoadingUpComming,
    error: errorUpComming,
  } = useQuery({ queryKey: ['upComming'], queryFn: () => tmdb.upComming() });

  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying,
  } = useQuery({ queryKey: ['nowPlaying'], queryFn: () => tmdb.NowPlaying() });

  return (
    <div>
      {keyword && keyword.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          {topRatedMovies && topRatedMovies.length > 0 && (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w1280${topRatedMovies[0].backdrop_path}`}
                alt={topRatedMovies[0].title}
              />
              <h1>{topRatedMovies[0].title}</h1>
              <p>{topRatedMovies[0].overview}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
