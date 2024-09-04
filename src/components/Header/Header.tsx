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
import { BiMenu, BiX } from 'react-icons/bi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const headerAnimation = useAnimation();
  const { scrollY } = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > 80) {
      headerAnimation.start('scroll');
    } else {
      headerAnimation.start('top');
    }
  });

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <HeaderContainer variants={headerVariants} animate={headerAnimation}>
      <Col>
        <Logo />
        <NavigationWrapper>
          <Navigation />
        </NavigationWrapper>
      </Col>
      <Col>
        <SearchForm />
        <MobileMenuButton onClick={toggleMenu}>
          {menuOpen ? <BiX /> : <BiMenu />}
        </MobileMenuButton>
      </Col>
      {menuOpen && (
        <MobileMenu>
          <MobileNavItem onClick={toggleMenu}>
            <Link to='/home'>Home</Link>
          </MobileNavItem>
          <MobileNavItem onClick={toggleMenu}>
            <Link to='/mywishlist'>MyWishList</Link>
          </MobileNavItem>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 80px;
  z-index: 1000;
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

const NavigationWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: 28px;
  cursor: pointer;
  color: white;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  z-index: 1000;
`;

const MobileNavItem = styled(motion.div)`
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`;
