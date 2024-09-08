import { useNavigate, useParams } from 'react-router-dom';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import SkeletonMovieList from '../components/SkeletonLoader/SkeletonMovieList';
import Spinner from '../components/Spinner';

export default function Search() {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const { tmdb } = useTmdbApi();

  const {
    data: searchMovies,
    lastElementRef,
    isLoading,
    error,
    isFetchingNextPage,
  } = useInfiniteScroll<IMovie>(
    ['search', keyword],
    ({ pageParam = 1 }) => tmdb.search(keyword!, pageParam as number),
    !!keyword
  );

  const openModal = (movieId: number) => {
    navigate(`?type=search&id=${movieId}`);
  };

  return (
    <Wrapper>
      <Title>
        "{keyword}" 검색 결과 (
        <span>
          {searchMovies?.pages?.reduce(
            (total, page) => total + page.length,
            0
          ) || 0}
        </span>
        )
      </Title>
      {isLoading ? (
        <SkeletonMovieList />
      ) : error ? (
        <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      ) : (
        <MovieList>
          {searchMovies?.pages.map((page, pageIndex) =>
            page.map((movie: IMovie, movieIndex) => {
              const isLastMovie =
                searchMovies.pages.length - 1 === pageIndex &&
                page.length - 1 === movieIndex;
              return (
                <div ref={isLastMovie ? lastElementRef : null} key={movie.id}>
                  <MovieCard
                    movie={movie}
                    type='search'
                    openModal={openModal}
                  />
                </div>
              );
            })
          )}
        </MovieList>
      )}
      {isFetchingNextPage && <Spinner />}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 0 60px;
  display: flex;
  flex-direction: column;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 0.2vw;
  row-gap: 40px;
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
