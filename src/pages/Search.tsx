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
    navigate(`?type=search&id=${movieId}`);
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
              type={'search'}
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
