import { useLocation } from 'react-router-dom';
import { IMovieDetail } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { modalState } from '../atom';

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
  width: 60%;
  max-height: 96vh;
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

export default function MovieModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tmdb } = useTmdbApi();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const id = queryParams.get('id');

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    setIsModalOpen(id ? true : false);
  }, [location]);

  const {
    isLoading,
    isError,
    data: movieDetail,
  } = useQuery<IMovieDetail>({
    queryKey: ['detail', id],
    queryFn: () => tmdb.movieDetails(Number(id)),
  });

  const onOverlayClick = () => navigate(-1);
  function closeModal(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    navigate(-1);
  }
  return (
    <AnimatePresence>
      {isModalOpen ? (
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isLoading && <p>로딩중입니다</p>}
          {isError ? <p>잠시후 다시 시도해주세요</p> : null}
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
            </Content>
          </ModalInfo>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}
