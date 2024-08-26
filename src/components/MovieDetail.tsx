import { useQuery } from '@tanstack/react-query';
import { makeImagePath } from '../utils/makeImagePath';
import { IMovie, IMovieDetail } from '../api/types';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
interface IMovieDetailProps {
  movie: IMovie;
}

const MovieCard = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const movieCardVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    height: '280px',
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: 'tween',
    },
  },
};

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const Title = styled.h4`
  font-size: 14px;
  text-align: center;
`;

const ButtonRuntimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 24px;
`;

const RunTime = styled.p`
  font-size: 12px;
`;

const GenreList = styled.div`
  font-size: 12px;
  text-align: center;
  color: grey;
`;

const Genre = styled.span`
  &:not(:last-child)::after {
    content: '﹒';
  }
`;

export default function MovieDetail({ movie }: IMovieDetailProps) {
  const { tmdb } = useTmdbApi();
  const { id, backdrop_path, title } = movie;
  const navigate = useNavigate();
  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery<IMovieDetail>({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdb.movieDetails(id),
  });
  const handleClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`, { state: { movieDetails } });
  };
  return (
    <MovieCard
      key={movie.id}
      whileHover='hover'
      initial='normal'
      variants={movieCardVariants}
      transition={{ type: 'tween' }}
      bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
    >
      <Info variants={infoVariants} onClick={() => handleClicked(id)}>
        <Title>{title}</Title>
        <ButtonRuntimeContainer>
          <RunTime>{movieDetails?.runtime} min</RunTime>
          <ToggleButton onClick={() => handleClicked(id)}>
            <IoIosArrowDropdownCircle />
          </ToggleButton>
        </ButtonRuntimeContainer>
        <GenreList>
          {movieDetails?.genres.map((genre) => (
            <Genre key={genre.id}>{genre.name}</Genre>
          ))}
        </GenreList>
      </Info>
    </MovieCard>
  );
}
