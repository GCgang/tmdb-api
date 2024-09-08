import styled from 'styled-components';

export default function SkeletonBanner() {
  return (
    <>
      <SkeletonTitle />
      <SkeletonOverview />
      <SkeletonButton />
    </>
  );
}

const SkeletonTitle = styled.div`
  width: 50%;
  height: 3rem;
  background-color: #555;
  margin-bottom: 20px;
  border-radius: 4px;

  @media (max-width: 1024px) {
    height: 2rem;
  }
`;

const SkeletonOverview = styled.div`
  width: 50%;
  height: 5rem;
  background-color: #555;
  margin-bottom: 20px;
  border-radius: 4px;

  @media (max-width: 1024px) {
    height: 4rem;
  }

  @media (max-width: 480px) {
    height: 3rem;
  }
`;

const SkeletonButton = styled.div`
  width: 120px;
  height: 40px;
  background-color: #555;
  border-radius: 4px;

  @media (max-width: 1024px) {
    width: 100px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 30px;
  }
`;
