import { makeImagePath } from '../utils/makeImagePath';
import { IMovie } from '../api/types';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IMovieCardProps {
  movie: IMovie;
}

const Card = styled(motion.div)<{ bgPhoto: string }>`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
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
    y: -40,
    transition: {
      delay: 0.2,
      duration: 0.2,
      type: 'tween',
    },
  },
};

const Image = styled(motion.img)`
  width: 100%;
  border-radius: 10px;
  background-color: white;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  display: flex;
  justify-content: end;
  width: 100%;
  bottom: 0;
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.1,
      type: 'tween',
    },
  },
};

const ToggleIcon = styled(IoIosArrowDropdownCircle)`
  color: white;
  font-size: 1.4rem;
`;

export default function MovieCard({ movie }: IMovieCardProps) {
  const { id, poster_path, title } = movie;
  const navigate = useNavigate();

  const handleClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`, { state: { movie } });
  };

  return (
    <Card
      key={id}
      onClick={() => handleClicked(id)}
      whileHover='hover'
      initial='normal'
      variants={movieCardVariants}
      transition={{ type: 'tween' }}
      bgPhoto={makeImagePath(poster_path, 'w500')}
    >
      <Image src={makeImagePath(movie.poster_path)} />
      <Info variants={infoVariants}>
        <ToggleIcon />
      </Info>
    </Card>
  );
}
