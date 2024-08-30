import Slider from 'react-slick';
import styled from 'styled-components';
import { IMovie } from '../api/types';
import MovieCard from './MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import MovieModal from './MovieModal';

interface IMovieSliderProps {
  title: string;
  movies: IMovie[];
  type: string;
}

const SliderWrapper = styled.section`
  margin-top: -200px;
  padding: 0 32px;
  margin-bottom: 12rem;

  .slick-list {
    overflow: visible !important;
  }

  .slick-slider:hover .slick-arrow {
    display: flex !important;
  }

  .slider_title {
    font-size: 2rem;
    position: relative;
    z-index: 1;
    color: white;
  }

  .slick-arrow {
    align-items: center;
    height: 100%;
    z-index: 99;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    width: auto;
    padding: 0 16px;
    display: none !important;
  }

  .slick-arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .slick-prev:before,
  .slick-next:before {
    font-size: 2rem;
    opacity: 1;
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }
`;

const Title = styled.h2`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: white;
`;

export default function MovieSlider({
  title,
  movies,
  type,
}: IMovieSliderProps) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const { category, movieId } = useParams();

  const clickedMovie = movies.find((movie: IMovie) => {
    return type === category && `${movie.id}` === movieId;
  });

  return (
    <SliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard key={`${movie.id}`} type={type} movie={movie} />
        ))}
      </Slider>
      {clickedMovie && <MovieModal movie={clickedMovie} type={type} />}
    </SliderWrapper>
  );
}
