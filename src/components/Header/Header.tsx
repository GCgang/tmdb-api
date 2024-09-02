import styled from 'styled-components';
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import Logo from './Logo';
import Navigation from './Navigation';
import SearchForm from './SearchForm';

export default function Header() {
  const headerAnimation = useAnimation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 80) {
      headerAnimation.start('scroll');
    } else {
      headerAnimation.start('top');
    }
  });

  return (
    <HeaderContainer variants={headerVariants} animate={headerAnimation}>
      <Col>
        <Logo />
        <Navigation />
      </Col>
      <Col>
        <SearchForm />
      </Col>
    </HeaderContainer>
  );
}

const HeaderContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 80px;
  z-index: 1;
  width: 100%;
  top: 0;
  padding: 0 60px;

  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const headerVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

const Col = styled.div`
  display: flex;
  align-items: center;
`;
