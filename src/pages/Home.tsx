import { useParams } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import MovieSlider from '../components/MovieSlider';
import NotFound from './NotFound';
import { IMovie } from '../api/types';
import Banner from '../components/Banner';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export default function Home() {
  const { keyword } = useParams();
  const { tmdb } = useTmdbApi();

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useQuery<IMovie[]>({
    queryKey: ['popular'],
    queryFn: () => tmdb.popular(),
  });

  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    error: errorTopRated,
  } = useQuery<IMovie[]>({
    queryKey: ['topRated'],
    queryFn: () => tmdb.topRated(),
  });
  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    error: errorNowPlaying,
  } = useQuery<IMovie[]>({
    queryKey: ['nowPlaying'],
    queryFn: () => tmdb.NowPlaying(),
  });
  const {
    data: upCommingMovies,
    isLoading: isLoadingUpComming,
    error: errorUpComming,
  } = useQuery<IMovie[]>({
    queryKey: ['upComming'],
    queryFn: () => tmdb.upComming(),
  });

  return (
    <>
      {keyword && keyword.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          {errorPopular && <NotFound />}
          {isLoadingPopular && <div>Loading...</div>}
          {popularMovies && <Banner movie={popularMovies[0]} />}
          <SliderWrapper>
            {popularMovies && (
              <MovieSlider
                title='TOP 10 시리즈'
                type='popular'
                movies={popularMovies.slice(1, 11)}
              />
            )}
            {errorTopRated && <NotFound />}
            {isLoadingTopRated && <div>Loading...</div>}
            {topRatedMovies && (
              <MovieSlider
                title='최고의 평가'
                type='topRated'
                movies={topRatedMovies}
              />
            )}
            {errorNowPlaying && <NotFound />}
            {isLoadingNowPlaying && <div>Loading...</div>}
            {nowPlayingMovies && (
              <MovieSlider
                title='절찬 상영중'
                type='nowPlaying'
                movies={nowPlayingMovies}
              />
            )}
            {errorUpComming && <NotFound />}
            {isLoadingUpComming && <div>Loading...</div>}
            {upCommingMovies && (
              <MovieSlider
                title='개봉 예정'
                type='upComming'
                movies={upCommingMovies}
              />
            )}
          </SliderWrapper>
        </>
      )}
    </>
  );
}
