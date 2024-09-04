import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useRecoilValue } from 'recoil';
import { myMovieWishList } from '../atom';
import { useQueries } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';

export default function MyWishList() {
  const navigate = useNavigate();
  const myWishList = useRecoilValue(myMovieWishList);
  const { tmdb } = useTmdbApi();

  const myMovieQuery = useQueries<IMovie[]>({
    queries: myWishList.map((movieId: number) => {
      return {
        queryKey: ['myMovies', String(movieId)],
        queryFn: () => tmdb.movieDetails(movieId),
      };
    }),
  });

  const myMovies = myMovieQuery
    .map((query) => query.data as IMovie)
    .filter(Boolean);

  const openModal = (movieId: number) => {
    navigate(`?type=mywishlist&id=${movieId}`);
  };

  if (myMovieQuery.some((query) => query.isLoading)) {
    return <p>Loading...</p>;
  }
  if (myMovieQuery.some((query) => query.isError)) {
    return <p>Failed to load some movies</p>;
  }
  return (
    <Wrapper>
      <Title>내가 찜한 리스트</Title>
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
