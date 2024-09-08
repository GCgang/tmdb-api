import { Link } from 'react-router-dom';
import Logo from '../components/Header/Logo';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <Wrapper>
      <Header>
        <Logo />
      </Header>
      <Content>
        <Title>길을 잃으셨나요 ?</Title>
        <Overview>
          죄송합니다. 해당 페이지를 찾을 수 없습니다. 홈페이지로 이동해 다양한
          콘텐츠를 만나보세요.
        </Overview>
        <Link to={'/'}>
          <Button>홈으로</Button>
        </Link>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  position: fixed;
  background-color: black;
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

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  margin-top: -360px;
  gap: 1rem;
  @media (max-width: 1024px) {
    padding: 0 40px;
  }

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const Title = styled.h1`
  font-size: 2.4rem;
  @media (max-width: 1024px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Overview = styled.p`
  font-size: 1.2rem;
  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Button = styled.button`
  background-color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
  &:hover {
    background-color: #e6e6e6;
  }
`;
