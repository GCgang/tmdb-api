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
  display: flex;
  flex-direction: column;
  gap: 280px;
  padding: 0px 40px;
  margin-bottom: 280px;
`;

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
    <>
      {keyword && keyword.length > 0 ? (
        <SearchResults />
      ) : (
        <>
          <Banner isLoading={isLoadingTopRated} movies={topRatedMovies} />
          <SliderWrapper>
            <MovieSlider
              title='TOP RATE'
              isLoading={isLoadingTopRated}
              movies={topRatedMovies}
            />
            <MovieSlider
              title='POPULAR'
              isLoading={isLoadingPopular}
              movies={popularMovies}
            />
            <MovieSlider
              title='UP COMMING'
              isLoading={isLoadingUpComming}
              movies={upCommingMovies}
            />
            <MovieSlider
              title='NOW PLAYING'
              isLoading={isLoadingNowPlaying}
              movies={nowPlayingMovies}
            />
          </SliderWrapper>
        </>
      )}
    </>
  );
}
