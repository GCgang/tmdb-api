import { useNavigate, useParams } from 'react-router-dom';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IMovie } from '../api/types';
import NotFound from './NotFound';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

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
      {error && <NotFound />}
      {isLoading && <div>Loading...</div>}
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
      <MovieList>
        {searchMovies?.pages.map((page, pageIndex) =>
          page.map((movie: IMovie, movieIndex) => {
            const isLastMovie =
              searchMovies.pages.length - 1 === pageIndex &&
              page.length - 1 === movieIndex;
            return (
              <div ref={isLastMovie ? lastElementRef : null} key={movie.id}>
                <MovieCard movie={movie} type='search' openModal={openModal} />
              </div>
            );
          })
        )}
      </MovieList>
      {isFetchingNextPage && <div>Loading more movies...</div>}
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
