import styled from 'styled-components';
import { IMovie } from '../api/types';

import MovieDetail from './MovieDetail';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
interface IMovieSliderProps {
  title: string;
  isLoading: boolean;
  movies: IMovie[] | undefined;
}

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const MoviesRow = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
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

export default function MovieSlider({
  title,
  isLoading,
  movies,
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
  const toggleLeaving = () => setLeaving((prev) => !prev);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Slider onClick={increaseIndex}>
      {title}
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <MoviesRow
          variants={rowVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{ type: 'tween', duration: 1 }}
          key={index}
        >
          {movies
            ?.slice(1)
            .slice(OFFSET * index, OFFSET * index + OFFSET)
            .map((movie) => (
              <MovieDetail key={movie.id} movie={movie} />
            ))}
        </MoviesRow>
      </AnimatePresence>
    </Slider>
  );
}
