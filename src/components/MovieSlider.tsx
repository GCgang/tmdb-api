import Slider from 'react-slick';
import styled from 'styled-components';
import { IMovie } from '../api/types';
import MovieCard from './MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import SkeletonSlider from './SkeletonLoader/SkeletonSlider';
import { sliderSettings } from '../config/sliderSettings';

interface IMovieSliderProps {
  title: string;
  movies: IMovie[];
  type: string;
  isLoading: boolean;
  isError: any;
}

export default function MovieSlider({
  title,
  movies,
  type,
  isLoading,
  isError,
}: IMovieSliderProps) {
  const navigate = useNavigate();

  const openModal = (movieId: number) => {
    navigate(`?type=${type}&id=${movieId}`);
  };

  return (
    <SliderWrapper>
      <Title>{title}</Title>
      {isLoading ? (
        <SkeletonSlider />
      ) : isError ? (
        <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      ) : (
        <Slider {...sliderSettings}>
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.id}`}
              movie={movie}
              type={type}
              openModal={openModal}
            />
          ))}
        </Slider>
      )}
    </SliderWrapper>
  );
}

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 10px;
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const SliderWrapper = styled.section`
  width: 100%;
  top: -16vw;
  position: relative;

  .slick-list {
    overflow: visible !important;
  }

  .slick-slider {
    z-index: 1;
  }

  .slick-slider:hover .slick-arrow {
    display: flex !important;
  }

  .slick-arrow {
    position: absolute;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 60px;
    z-index: 99;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    display: none !important;
  }

  .slick-arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .slick-prev {
    left: -60px;
  }

  .slick-next {
    right: -60px;
  }

  @media (max-width: 1024px) {
    .slick-arrow {
      width: 40px;
    }

    .slick-prev {
      left: -40px;
    }

    .slick-next {
      right: -40px;
    }
  }

  @media (max-width: 480px) {
    overflow-x: hidden;
    .slick-arrow {
      width: 20px;
    }

    .slick-prev {
      left: -20px;
    }

    .slick-next {
      right: -20px;
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.red};
  text-align: center;
  font-size: 1.2rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
