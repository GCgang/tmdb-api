import MovieSlider from '../components/MovieSlider';
import Banner from '../components/Banner';
import styled from 'styled-components';
import { useMovies } from '../hooks/useMovies';

export default function Home() {
  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
  } = useMovies('popular');
  const {
    data: topRatedMovies,
    isLoading: isLoadingTopRated,
    isError: isErrorTopRated,
  } = useMovies('topRated');
  const {
    data: nowPlayingMovies,
    isLoading: isLoadingNowPlaying,
    isError: isErrorNowPlaying,
  } = useMovies('nowPlaying');
  const {
    data: upCommingMovies,
    isLoading: isLoadingUpComming,
    isError: isErrorUpComming,
  } = useMovies('upComming');
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
