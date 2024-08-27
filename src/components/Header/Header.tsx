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

const HeaderContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 16px;
  padding: 20px 40px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const headerVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
};

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
