import styled from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navigation() {
  const matchHome = useMatch('/home');
  const matchWish = useMatch('/mywishlist');

  return (
    <NavBar>
      <NavItem>
        <Link to='/home'>Home {matchHome && <Circle layoutId='circle' />}</Link>
      </NavItem>
      <Link to='/mywishlist'>
        <NavItem>
          MyWishList {matchWish && <Circle layoutId='circle' />}
        </NavItem>
      </Link>
    </NavBar>
  );
}

const NavBar = styled.ul`
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li`
  position: relative;
  margin-left: 20px;
  font-size: 1rem;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;
