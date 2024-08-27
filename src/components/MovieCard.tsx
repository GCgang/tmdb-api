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
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
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
    y: -40,
    transition: {
      delay: 0.2,
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  bottom: 0;
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: 'tween',
    },
  },
};

const Title = styled.h4`
  font-size: 14px;
  text-align: center;
`;

const ToggleIcon = styled(IoIosArrowDropdownCircle)`
  color: white;
  font-size: 16px;
`;

export default function MovieCard({ movie }: IMovieCardProps) {
  const { id, backdrop_path, title } = movie;
  const navigate = useNavigate();
  const handleClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  return (
    <Card
      key={id}
      onClick={() => handleClicked(id)}
      whileHover='hover'
      initial='normal'
      variants={movieCardVariants}
      transition={{ type: 'tween' }}
      bgPhoto={makeImagePath(backdrop_path, 'w500')}
    >
      <Info variants={infoVariants}>
        <Title>{title}</Title>
        <ToggleIcon />
      </Info>
    </Card>
  );
}
