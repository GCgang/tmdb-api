import { useNavigate, useParams } from 'react-router-dom';
import { useTmdbApi } from '../context/TmdbApiContext';
import { useQuery } from '@tanstack/react-query';
import { IMovie } from '../api/types';
import MovieSlider from '../components/MovieSlider';
import NotFound from './NotFound';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const navigate = useNavigate();
  const { keyword } = useParams<{ keyword: string }>();
  const { tmdb } = useTmdbApi();

  const {
    data: searchMovies,
    isLoading,
    error,
  } = useQuery<IMovie[]>({
    queryKey: ['search', keyword],
    queryFn: () => tmdb.search(keyword),
    enabled: !!keyword,
  });

  const openModal = (movieId: number) => {
    navigate(`?type=mywishlist&id=${movieId}`);
  };

  return (
    <Wrapper>
      {error && <NotFound />}
      {isLoading && <div>Loading...</div>}
      <Title>
        "{`${keyword}`}" 검색 결과(<span>{searchMovies?.length}</span>)
      </Title>
      <MovieList>
        {searchMovies &&
          searchMovies.map((movie) => (
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
