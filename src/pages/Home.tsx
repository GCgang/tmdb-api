import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';

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

  const movieId = topRatedMovies?.[0]?.id;

  const {
    data: movieImages,
    isLoading: isLoadingMovieImages,
    error: errorMovieImages,
  } = useQuery({
    queryKey: ['movieImages', movieId],
    queryFn: () => tmdb.movieImages(movieId),
    enabled: !!movieId,
  });

  console.log(movieImages);
  return (
    <div>
      {keyword && keyword.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          {movieImages &&
            movieImages.backdrops &&
            movieImages.backdrops.length > 0 && (
              <div>
                {movieImages.backdrops
                  .slice(0, 5)
                  .map((image: Backdrop, index: number) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
                      alt={`Movie Image ${index + 1}`}
                    />
                  ))}
              </div>
            )}
          <h1>{topRatedMovies?.[0]?.title}</h1>
          <p>{topRatedMovies?.[0]?.overview}</p>
        </>
        
      )}
    </div>
  );
}
