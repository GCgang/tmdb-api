import styled, { keyframes } from 'styled-components';

export default function SkeletonContents() {
  return (
    <MovieList>
      {[...Array(4)].map((_, index) => (
        <SkeletonCard key={index} $delay={index * 0.1} />
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
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkeletonCard = styled.div<{ $delay: number }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-color: #333;
  position: relative;
  border-radius: 5px;
  animation: ${pulse} 1.2s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay}s;
`;
