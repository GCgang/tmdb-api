import { useParams } from 'react-router-dom';
import { IMovie, IMovieDetail } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { useTmdbApi } from '../context/TmdbApiContext';

interface IMovieModalProps {
  movie: IMovie;
  type: string;
}

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

export default function MovieModal({ movie, type }: IMovieModalProps) {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { id, title, release_date, overview, poster_path } = movie;
  const { tmdb } = useTmdbApi();
  const {
    isLoading,
    isError,
    data: movieDetail,
  } = useQuery<IMovieDetail>({
    queryKey: ['detail'],
    queryFn: () => tmdb.movieDetails(id),
  });

  const onOverlayClick = () => navigate('/');
  return (
    <AnimatePresence>
      {movieId ? (
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ModalInfo layoutId={`${type}${id}`}>
            <ModalButton
              onClick={() => {
                navigate(-1);
              }}
              whileHover={{ scale: 1.2 }}
              initial={{ scale: 1 }}
            >
              <MdClose />
            </ModalButton>
            <ModalCover src={makeImagePath(poster_path)} alt={title} />
            <Content>
              <ModalTitle>{title}</ModalTitle>
              <ModalOverView>{overview}</ModalOverView>
              <InfoContainer>
                <InfoItem>개봉일:</InfoItem>
                <InfoItem>{release_date}</InfoItem>
              </InfoContainer>
              {isLoading && <p>로딩중입니다</p>}
              {isError ? <p>잠시후 다시 시도해주세요</p> : null}
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
