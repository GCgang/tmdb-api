import { makeImagePath } from '../utils/makeImagePath';
import { IMovie } from '../api/types';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface IMovieCardProps {
  movie: IMovie;
  type: string;
  openModal: (id: number) => void;
}

const Card = styled(motion.div)`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 1rem;
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
    },
  },
};

const ToggleIcon = styled(IoIosArrowDropdownCircle)`
  color: white;
  font-size: 1.4rem;
`;

export default function MovieCard({ movie, type, openModal }: IMovieCardProps) {
  const { id, poster_path, title } = movie;

  return (
    <Card
      onClick={() => openModal(id)}
      whileHover='hover'
      initial='normal'
      variants={movieCardVariants}
      layoutId={`${type}${id}`}
    >
      <Image src={makeImagePath(poster_path)} alt={title} />
      <Info variants={infoVariants}>
        <ToggleIcon />
      </Info>
    </Card>
  );
}
