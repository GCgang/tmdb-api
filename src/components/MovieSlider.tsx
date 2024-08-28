import styled from 'styled-components';
import { IMovie } from '../api/types';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useMatch } from 'react-router-dom';

interface IMovieSliderProps {
  title: string;
  movies: IMovie[];
  type: string;
}

const Slider = styled.div`
  position: relative;
  margin-top: -20rem;
  padding: 0 20px;
`;

const MoviesRow = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  width: 100%;
  gap: 1rem;
  position: relative;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 1.6rem;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const OFFSET = 6;

const SideArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  font-size: 40px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease-in;
  background-color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const LeftArrow = styled(SideArrow)`
  left: -60px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RightArrow = styled(SideArrow)`
  right: -60px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export default function MovieSlider({
  title,
  movies,
  type,
}: IMovieSliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movies.length - 1;
      const maxIndex = Math.floor(totalMovies / OFFSET) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (movies) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = movies.length - 1;
      const maxIndex = Math.floor(totalMovies / OFFSET) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Slider>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <MoviesRow
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          <LeftArrow onClick={decreaseIndex}>{'<'}</LeftArrow>
          {movies
            ?.slice(1)
            .slice(OFFSET * index, OFFSET * index + OFFSET)
            .map((movie) => (
              <MovieCard key={`${movie.id}`} movie={movie} />
            ))}
          <RightArrow onClick={increaseIndex}>{'>'}</RightArrow>
        </MoviesRow>
      </AnimatePresence>
      <AnimatePresence></AnimatePresence>
    </Slider>
  );
}
