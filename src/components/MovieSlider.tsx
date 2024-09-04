import Slider from 'react-slick';
import styled from 'styled-components';
import { IMovie } from '../api/types';
import MovieCard from './MovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';

interface IMovieSliderProps {
  title: string;
  movies: IMovie[];
  type: string;
}

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
  const navigate = useNavigate();

  const openModal = (movieId: number) => {
    navigate(`?type=${type ? `${type}` : ''}&id=${movieId}`);
  };

  return (
    <SliderWrapper>
      <Title>{title}</Title>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard
            key={`${movie.id}`}
            movie={movie}
            type={type}
            openModal={openModal}
          />
        ))}
      </Slider>
    </SliderWrapper>
  );
}

const Title = styled.h2`
  font-size: 1.4rem;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const SliderWrapper = styled.section`
  width: 100%;
  padding: 0 60px;
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
    padding: 0 40px;

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
    padding: 0 20px;
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
