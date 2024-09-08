import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useRecoilValue } from 'recoil';
import { myMovieWishList } from '../atom';
import { useQueries } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import SkeletonMovieList from '../components/SkeletonLoader/SkeletonMovieList';

export default function MyWishList() {
  const navigate = useNavigate();
  const myWishList = useRecoilValue(myMovieWishList);
  const { tmdb } = useTmdbApi();

  const myMovieQueries = useQueries<IMovie[]>({
    queries: myWishList.map((movieId: number) => {
      return {
        queryKey: ['myMovies', String(movieId)],
        queryFn: () => tmdb.movieDetails(movieId),
      };
    }),
  });

  const isLoading = myMovieQueries.some((query) => query.isLoading);
  const isError = myMovieQueries.some((query) => query.isError);
  const myMovies = myMovieQueries
    .map((query) => query.data as IMovie)
    .filter(Boolean);

  const openModal = (movieId: number) => {
    navigate(`?type=mywishlist&id=${movieId}`);
  };

  return (
    <Wrapper>
      <Title>내가 찜한 리스트</Title>
      {isLoading ? (
        <SkeletonMovieList />
      ) : isError ? (
        <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      ) : (
        <MovieList>
          {myMovies.map((movie) => (
            <MovieCard
              key={`${movie.id}`}
              movie={movie}
              type={'mywishlist'}
              openModal={openModal}
            />
          ))}
        </MovieList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 0 60px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
  display: flex;
  flex-direction: column;
`;

const MovieList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 0.2vw;
  row-gap: 40px;
  position: relative;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Title = styled.h1`
  margin-top: 8rem;
  margin-bottom: 8rem;
  font-size: 2rem;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.red};
  text-align: center;
  font-size: 1.5rem;
`;
