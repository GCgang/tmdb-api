import styled from 'styled-components';
import { Link, useMatch } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)<{ to: string }>`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
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

export default function Navigation() {
  const matchRoot = useMatch('/');
  const matchHome = useMatch('/home');
  const homeMatch = matchRoot || matchHome;
  const topRateMatch = useMatch('/toprated');
  const popularMatch = useMatch('/popular');
  const upcommingMatch = useMatch('/upcomming');
  const nowPlayingMatch = useMatch('/nowplaying');

  return (
    <NavBar>
      <NavItem to='/home'>
        Home {homeMatch && <Circle layoutId='circle' />}
      </NavItem>
      <NavItem to='/toprated'>
        TopRate {topRateMatch && <Circle layoutId='circle' />}
      </NavItem>
      <NavItem to='/popular'>
        Popular {popularMatch && <Circle layoutId='circle' />}
      </NavItem>
      <NavItem to='/upcomming'>
        UpCommming {upcommingMatch && <Circle layoutId='circle' />}
      </NavItem>
      <NavItem to='/nowplaying'>
        NowPlaying {nowPlayingMatch && <Circle layoutId='circle' />}
      </NavItem>
    </NavBar>
  );
}
