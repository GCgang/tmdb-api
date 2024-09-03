import { useLocation } from 'react-router-dom';
import { IMovie, IMovieDetail } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { modalState } from '../atom';
import useMyWishList from '../hooks/useMyWishList';
import { IoIosAddCircle } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import MovieCard from './MovieCard';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 100vh;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const ModalInfo = styled(motion.div)`
  position: absolute;
  width: 90%;
  max-height: 90vh;
  background-color: #141414;
  color: #fff;
  z-index: 999;
  overflow: auto;
  border-radius: 10px;
  max-width: 1400px;
`;

const ModalCover = styled(motion.img)`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 50vh;
  min-height: 350px;
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const ModalTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin: 0;
`;
const ModalOverView = styled(motion.p)`
  font-size: 1.5rem;
  line-height: 1.5;
`;

const ModalButton = styled(motion.button)`
  color: #ffffff;
  background-color: #181818;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const InfoContainer = styled(motion.div)`
  display: flex;
  margin-top: 0.4rem;
  gap: 0.4rem;
  span {
    &:first-child {
      opacity: 0.6;
    }
  }
`;

const InfoItem = styled(motion.span)`
  font-size: 1.2rem;
`;

const Icons = styled.div`
  color: white;
  font-size: 2rem;
  cursor: pointer;
  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }
`;

const Title = styled.h1`
  margin-bottom: 4rem;
  font-size: 2rem;
`;

export default function MovieModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tmdb } = useTmdbApi();
  const [index, setIndex] = useState(6);

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const id = queryParams.get('id');

  const { isNewItem, addItem, removeItem } = useMyWishList();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  const {
    isLoading: isLoadingDetail,
    isError: isErrorDetail,
    data: movieDetail,
  } = useQuery<IMovieDetail>({
    queryKey: ['detail', id],
    queryFn: () => tmdb.movieDetails(Number(id)),
    enabled: !!id,
  });

  const {
    isLoading: isLoadingSimilar,
    isError: isErrorSimilar,
    data: similarMovies,
  } = useQuery<IMovie[]>({
    queryKey: ['similar', id],
    queryFn: () => tmdb.similarMovies(Number(id)),
    enabled: !!id,
  });

  const onOverlayClick = () => navigate(-1);
  function closeModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    navigate(-1);
  }

  const openModal = (movieId: number) => {
    navigate(`?type=similar&id=${movieId}`);
  };

  return (
    <>
      {isModalOpen ? (
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isLoadingDetail && <p>로딩중입니다</p>}
          {isErrorDetail ? <p>잠시후 다시 시도해주세요</p> : null}
          <ModalInfo layoutId={`${type}${id}`}>
            <ModalButton
              onClick={closeModal}
              whileHover={{ scale: 1.2 }}
              initial={{ scale: 1 }}
            >
              <MdClose />
            </ModalButton>
            <ModalCover
              src={makeImagePath(movieDetail?.poster_path!)}
              alt={movieDetail?.title}
            />
            <Content>
              <Icons>
                {isNewItem(Number(id)) ? (
                  <IoIosAddCircle
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(Number(id));
                    }}
                  />
                ) : (
                  <FaCheckCircle
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(Number(id));
                    }}
                  />
                )}
              </Icons>
              <ModalTitle>{movieDetail?.title}</ModalTitle>
              <ModalOverView>{movieDetail?.overview}</ModalOverView>
              <InfoContainer>
                <InfoItem>개봉일:</InfoItem>
                <InfoItem>{movieDetail?.release_date}</InfoItem>
              </InfoContainer>
              <InfoContainer>
                <InfoItem>런타임:</InfoItem>
                <InfoItem>{movieDetail?.runtime} 분</InfoItem>
              </InfoContainer>
              <InfoContainer>
                <InfoItem>평점:</InfoItem>
                <InfoItem>{movieDetail?.vote_average} 점</InfoItem>
              </InfoContainer>
              <InfoContainer>
                <InfoItem>장르:</InfoItem>
                <InfoItem>
                  {movieDetail?.genres.map((genre) => genre.name).join(', ')}
                </InfoItem>
              </InfoContainer>
              {isLoadingSimilar && <p>로딩중입니다</p>}
              {isErrorSimilar ? <p>잠시후 다시 시도해주세요</p> : null}
              <Title>비슷한 콘텐츠</Title>
              <SimilarContents>
                {similarMovies?.slice(0, index).map((similarMovie) => (
                  <div key={similarMovie?.id}>
                    <SimilarContent
                      bgPoster={makeImagePath(similarMovie?.poster_path)}
                    ></SimilarContent>
                    <Info>
                      <p>{similarMovie?.release_date}</p>
                      <Icons>
                        {isNewItem(Number(similarMovie?.id)) ? (
                          <IoIosAddCircle
                            onClick={(e) => {
                              e.stopPropagation();
                              addItem(Number(similarMovie?.id));
                            }}
                          />
                        ) : (
                          <FaCheckCircle
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(Number(similarMovie?.id));
                            }}
                          />
                        )}
                      </Icons>
                    </Info>
                  </div>
                ))}
                {index > similarMovies?.length! ? (
                  <div>더큼</div>
                ) : (
                  <div>작음</div>
                )}
              </SimilarContents>
            </Content>
          </ModalInfo>
        </Overlay>
      ) : null}
    </>
  );
}

const SimilarContents = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;
`;

const SimilarContent = styled.div<{ bgPoster: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-image: url(${(props) => props.bgPoster});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  padding-top: 10px;
  h1 {
    font-size: 14px;
    font-weight: 700;
    text-align: center;
    margin: 5px 0;
  }
`;
