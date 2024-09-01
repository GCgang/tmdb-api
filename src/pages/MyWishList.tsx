import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myMovieWishList } from '../atom';
import { useQueries } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import { useEffect } from 'react';

export default function MyWishList() {
  const navigate = useNavigate();
  const [myWishList, setMyWishList] = useRecoilState(myMovieWishList);

  // const myWishList = useRecoilValue(myMovieWishList);
  const { tmdb } = useTmdbApi();

  useEffect(() => {
    setMyWishList([550, 500]);
  }, [setMyWishList]);

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

const Wrapper = styled.div`
  padding: 60px;
  display: flex;
  flex-direction: column;
`;

const MovieList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;
`;
