import { useParams } from 'react-router-dom';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

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
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`;

const ModalInfo = styled(motion.div)`
  position: relative;
  width: 50%;
  max-height: 100vh;
  background-color: #141414;
  color: #fff;
  z-index: 999;
  overflow: auto;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Content = styled.div`
  padding: 0 50px 50px;
  margin-top: -100px;

  h3 {
    font-size: 2.5rem;
    margin: 0;
  }
  p {
    line-height: 1.5;
  }
  button {
    color: #ffffff;
    background-color: #141414;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: 2px solid #fff;
    border-radius: 20px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .content {
    display: flex;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 30px;
    }
    div.img {
      width: 200px;
      margin-right: 50px;
      flex-shrink: 0;
    }
    div.info {
      text-align: left;
      line-height: 1.7;
      color: #d2d2d2;
      span {
        color: #fff;
        padding-left: 10px;
        img {
          height: 20px;
        }
      }
    }
  }
`;

export default function MovieModal({ movie, type }: IMovieModalProps) {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const { id, title, release_date, overview, poster_path } = movie;
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
            <Content>
              <h3>{title}</h3>
              <p>{overview}</p>
              <div>
                <img
                  src={makeImagePath(poster_path, 'w500')}
                  alt={title}
                  width='100%'
                />
              </div>
              <motion.button
                onClick={() => {
                  navigate(-1);
                }}
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 1 }}
              >
                <MdClose />
              </motion.button>
              <div>
                <span>{release_date}</span>
              </div>
            </Content>
          </ModalInfo>
        </Overlay>
      ) : null}
    </AnimatePresence>
  );
}
