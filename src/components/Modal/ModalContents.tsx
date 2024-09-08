import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useTmdbApi } from '../../context/TmdbApiContext';
import { makeImagePath } from '../../utils/makeImagePath';
import { IMovie } from '../../api/types';
import WishListButton from '../WishListButton';
import { MdExpandMore } from 'react-icons/md';
import { motion } from 'framer-motion';
import SkeletonContents from '../SkeletonLoader/SkeletonContents';

const OFFSET = 6;

export default function ModalContents({ id }: { id: number }) {
  const { tmdb } = useTmdbApi();
  const [index, setIndex] = useState(OFFSET);

  const {
    isLoading,
    isError,
    data: similarMovies,
  } = useQuery<IMovie[]>({
    queryKey: ['similar', 'id'],
    queryFn: () => tmdb.similarMovies(id),
    enabled: !!id,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => prev + OFFSET);
  };

  if (isLoading) return <SkeletonContents />;
  if (isError) {
    <Title>비슷한 콘텐츠</Title>;
    <Container>
      <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
    </Container>;
  }
  return (
    <>
      <Title>비슷한 콘텐츠</Title>
      <SimilarContents>
        {similarMovies?.slice(0, index).map((similarMovie) => (
          <SimilarContent key={similarMovie?.id}>
            <SimilarPoster
              $bgPoster={makeImagePath(similarMovie?.poster_path)}
            />
            <Info>
              <ReleaseDate>{similarMovie?.release_date}</ReleaseDate>
              <WishButton>
                <WishListButton id={similarMovie.id} />
              </WishButton>
            </Info>
          </SimilarContent>
        ))}
        {index < similarMovies?.length! ? (
          <MoreButton>
            <MdExpandMore onClick={handleClick} />
          </MoreButton>
        ) : null}
      </SimilarContents>
      <Footer></Footer>
    </>
  );
}

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const SimilarContents = styled.div`
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

const SimilarContent = styled.div``;

const SimilarPoster = styled.div<{ $bgPoster: string }>`
  width: 100%;
  aspect-ratio: 2 / 3;
  background-image: url(${(props) => props.$bgPoster});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;

const ReleaseDate = styled.p`
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const MoreButton = styled(motion.button)`
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border: 2px solid lightgray;
  color: lightgray;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  :hover {
    color: white;
  }

  svg {
    font-size: 24px;
  }
`;

const WishButton = styled.div`
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Footer = styled.div`
  margin-bottom: 40px;
`;

const Container = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 350px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.red};
  text-align: center;
  font-size: 1.5rem;
`;
