import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import MovieSlider from '../components/MovieSlider';
import { IMovie } from '../api/types';
import Banner from '../components/Banner';
import styled from 'styled-components';

export default function Home() {
  const { tmdb } = useTmdbApi();

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
  } = useQuery<IMovie[]>({
    queryKey: ['popular'],
    queryFn: () => tmdb.popular(),
  });

  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    isError: isErrorTopRated,
  } = useQuery<IMovie[]>({
    queryKey: ['topRated'],
    queryFn: () => tmdb.topRated(),
  });

  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    isError: isErrorNowPlaying,
  } = useQuery<IMovie[]>({
    queryKey: ['nowPlaying'],
    queryFn: () => tmdb.NowPlaying(),
  });

  const {
    data: upCommingMovies,
    isLoading: isLoadingUpComming,
    isError: isErrorUpComming,
  } = useQuery<IMovie[]>({
    queryKey: ['upComming'],
    queryFn: () => tmdb.upComming(),
  });

  return (
    <>
      <Banner
        movie={popularMovies ? popularMovies[0] : null}
        isLoading={isLoadingPopular}
        isError={isErrorPopular}
      />
      <SliderWrapper>
        <MovieSlider
          title='TOP 10 시리즈'
          type='popular'
          movies={popularMovies ? popularMovies.slice(1, 11) : []}
          isLoading={isLoadingPopular}
          isError={isErrorPopular}
        />
        <MovieSlider
          title='최고의 평가'
          type='toprated'
          movies={topRatedMovies || []}
          isLoading={isLoadingTopRated}
          isError={isErrorTopRated}
        />
        <MovieSlider
          title='절찬 상영중'
          type='nowplaying'
          movies={nowPlayingMovies || []}
          isLoading={isLoadingNowPlaying}
          isError={isErrorNowPlaying}
        />
        <MovieSlider
          title='개봉 예정'
          type='upcomming'
          movies={upCommingMovies || []}
          isLoading={isLoadingUpComming}
          isError={isErrorUpComming}
        />
      </SliderWrapper>
    </>
  );
}

const SliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 0 60px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;
