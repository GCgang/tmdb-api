import { makeImagePath } from '../utils/makeImagePath';
import { IMovie } from '../api/types';
import { IoIosArrowDropdownCircle, IoIosAddCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useMyWishList from '../hooks/useMyWishList';

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
  flex-direction: column;
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

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }
`;
const ReleseDate = styled.p`
  margin: 0.2rem;
`;
const VoteAverage = styled.p`
  margin: 0.2rem;
`;

export default function MovieCard({ movie, type, openModal }: IMovieCardProps) {
  const { id, poster_path, title } = movie;
  const { isNewItem, addItem, removeItem } = useMyWishList();
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
        <Icons>
          {isNewItem(id) ? (
            <IoIosAddCircle onClick={() => addItem(id)} />
          ) : (
            <FaCheckCircle onClick={() => removeItem(id)} />
          )}
          <IoIosArrowDropdownCircle />
        </Icons>
        <ReleseDate>개봉일: {movie.release_date}</ReleseDate>
        <VoteAverage>평점: {movie.vote_average}</VoteAverage>
      </Info>
    </Card>
  );
}
