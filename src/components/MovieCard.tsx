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

export default function MovieCard({ movie, type, openModal }: IMovieCardProps) {
  const { id, backdrop_path, title } = movie;
  const { isNewItem, addItem, removeItem } = useMyWishList();
  return (
    <Card>
      <Thumbnail
        bgPhoto={makeImagePath(backdrop_path)}
        variants={cardVariants}
        onClick={() => openModal(id)}
        whileHover='hover'
        initial='normal'
        layoutId={`${type}${id}`}
      >
        <Info variants={infoVariants}>
          <Title>{title}</Title>
          <Icons>
            {isNewItem(id) ? (
              <IoIosAddCircle
                onClick={(e) => {
                  addItem(id);
                  e.stopPropagation();
                }}
              />
            ) : (
              <FaCheckCircle onClick={() => removeItem(id)} />
            )}
            <IoIosArrowDropdownCircle />
          </Icons>
          <ReleseDate>개봉일: {movie.release_date}</ReleseDate>
          <VoteAverage>평점: {movie.vote_average}</VoteAverage>
        </Info>
      </Thumbnail>
    </Card>
  );
}

const Card = styled(motion.div)`
  width: 100%;
  padding: 0 0.2vw;
  position: relative;
`;

const cardVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    zIndex: 10,
    transition: {
      delay: 0.2,
      duration: 0.2,
      type: 'tween',
    },
  },
};

const Info = styled(motion.div)`
  display: none;
  width: 100%;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  position: absolute;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;

  @media (max-width: 1024px) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 4px;
  }
`;

const Thumbnail = styled(motion.div)<{ bgPhoto: string }>`
  cursor: pointer;
  width: 100%;
  padding-top: 56.25%;
  background-image: url(${({ bgPhoto }) => bgPhoto});
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const infoVariants = {
  hover: {
    display: 'block',
    transition: {
      delay: 0.2,
      duration: 0.1,
    },
  },
};

const Icons = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: 5px;
  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Title = styled(motion.div)`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 5px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ReleseDate = styled(motion.p)`
  font-size: 0.8rem;
  margin: 0.2rem;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const VoteAverage = styled(motion.p)`
  font-size: 0.8rem;
  margin: 0.2rem;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
