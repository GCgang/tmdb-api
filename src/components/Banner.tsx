import styled from 'styled-components';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import SkeletonBanner from '../components/SkeletonLoader/SkeletonBanner'; // 스켈레톤 추가

interface IBannerProps {
  movie: IMovie | null;
  isLoading: boolean;
  isError: any;
}

export default function Banner({ movie, isLoading, isError }: IBannerProps) {
  const navigate = useNavigate();
  const openModal = (id: number) => {
    navigate(`?type=popular&id=${id}`);
  };

  return (
    <BannerSection
      $bgPhoto={makeImagePath(movie?.backdrop_path, 'backdrop')}
      $bgPoster={makeImagePath(movie?.poster_path, 'poster')}
    >
      {isLoading ? (
        <SkeletonBanner />
      ) : isError || !movie ? (
        <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      ) : (
        <>
          <Title>{movie.title}</Title>
          <Overview>{movie.overview}</Overview>
          <MoreButton onClick={() => openModal(movie.id)}>
            <IoIosInformationCircleOutline />
            <span>상세 정보</span>
          </MoreButton>
        </>
      )}
    </BannerSection>
  );
}

const BannerSection = styled.section<{ $bgPhoto: string; $bgPoster?: string }>`
  height: 56.25vw;
  width: 100%;
  z-index: 0;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;

  @media (max-width: 1024px) {
    height: 80vw;
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    height: 140vw;
    padding: 0 20px;
    align-items: center;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
      url(${(props) => props.$bgPoster});
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.red};
  text-align: center;
  font-size: 1.5rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const Overview = styled.p`
  font-size: 1.2rem;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.2em;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    -webkit-line-clamp: 3;
    font-size: 0.8rem;
  }
`;

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 1.6rem;
  font-weight: 400;
  color: white;
  background-color: rgba(92, 88, 88, 0.9);
  span {
    font-size: 1.2rem;
  }
  transition: all 0.3s ease-in-out;

  @media (hover: hover) {
    &:hover {
      background-color: rgba(92, 88, 88, 0.6);
    }
  }

  @media (max-width: 1024px) {
    font-size: 1.4rem;
    span {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    span {
      font-size: 0.8rem;
    }
  }
`;
