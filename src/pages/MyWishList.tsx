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

  const openModal = (movieId: number) => {
    navigate(`?type=mywishlist&id=${movieId}`);
  };

  const myMovieQuery = useQueries({
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
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const MovieList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: relative;
`;

const Title = styled.h1`
  margin-top: 4rem;
  margin-bottom: 8rem;
  font-size: 2rem;
`;
