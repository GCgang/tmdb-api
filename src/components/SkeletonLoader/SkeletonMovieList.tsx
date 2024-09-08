import styled, { keyframes } from 'styled-components';

export default function SkeletonMovieList() {
  return (
    <MovieList>
      {[...Array(5)].map((_, index) => (
        <SkeletonCard key={index} delay={index * 0.1} />
      ))}
    </MovieList>
  );
}

const pulse = keyframes`
  0% {
    opacity: 0.5;
    background-color: #444;
  }
  50% {
    opacity: 0.6;
    background-color: #666;
  }
  100% {
    opacity: 0.8;
    background-color: #444;
  }
`;

const MovieList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 0.2vw;
  row-gap: 40px;
  position: relative;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkeletonCard = styled.div<{ delay: number }>`
  cursor: pointer;
  width: 100%;
  padding-top: 56.25%;
  background-color: #333;
  position: relative;
  border-radius: 4px;
  animation: ${pulse} 1.2s infinite ease-in-out;
  animation-delay: ${({ delay }) => `${delay}s`};
`;
