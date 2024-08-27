import { useLocation } from 'react-router-dom';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import NotFound from '../pages/NotFound';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
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

export default function MovieModal() {
  const location = useLocation();
  const movie = location.state?.movie as IMovie;
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  if (!movie) return <NotFound />;

  const { id, title, release_date, overview, backdrop_path } = movie;
  const onOverlayClick = () => navigate('/');

  return (
    <AnimatePresence>
      <>
        <Overlay
          onClick={onOverlayClick}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <BigMovie
          style={{ top: scrollY.get() + 100 }}
          layoutId={location.pathname}
        >
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                backdrop_path,
                'w500'
              )})`,
            }}
          />
          <BigTitle>{title}</BigTitle>
          <BigOverview>{overview}</BigOverview>
        </BigMovie>
      </>
    </AnimatePresence>
  );
}
