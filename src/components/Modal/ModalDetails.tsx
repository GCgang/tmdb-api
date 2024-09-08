import styled from 'styled-components';
import { useTmdbApi } from '../../context/TmdbApiContext';
import { useQuery } from '@tanstack/react-query';
import { makeImagePath } from '../../utils/makeImagePath';
import { IMovieDetail } from '../../api/types';
import WishListButton from '../WishListButton';
import Spinner from '../Spinner';

export default function ModalDetails({ id }: { id: number }) {
  const { tmdb } = useTmdbApi();

  const {
    isLoading,
    isError,
    data: movieDetails,
  } = useQuery<IMovieDetail>({
    queryKey: ['modalDetails', id],
    queryFn: () => tmdb.movieDetails(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  if (isError)
    return (
      <Container>
        <ErrorMessage>영화를 불러오는 중 오류가 발생했습니다.</ErrorMessage>
      </Container>
    );
  return (
    <>
      <ModalCover
        src={makeImagePath(movieDetails?.poster_path!)}
        alt={movieDetails?.title}
      />
      <TitleBar>
        <ModalTitle>{movieDetails?.title}</ModalTitle>
        <WishButton>
          <WishListButton id={id} />
        </WishButton>
      </TitleBar>
      <ModalOverView>{movieDetails?.overview}</ModalOverView>
      <InfoSection>
        <InfoContainer>
          <InfoItem>개봉일:</InfoItem>
          <InfoItem>{movieDetails?.release_date}</InfoItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItem>런타임:</InfoItem>
          <InfoItem>{movieDetails?.runtime} 분</InfoItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItem>평점:</InfoItem>
          <InfoItem>{movieDetails?.vote_average} 점</InfoItem>
        </InfoContainer>
        <InfoContainer>
          <InfoItem>장르:</InfoItem>
          <InfoItem>
            {movieDetails?.genres.map((genre) => genre.name).join(', ')}
          </InfoItem>
        </InfoContainer>
      </InfoSection>
    </>
  );
}
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const WishButton = styled.div`
  font-size: 2rem;
  cursor: pointer;

  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ModalCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 50vh;
  min-height: 350px;
  margin-bottom: 1rem;
`;

const ModalOverView = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-top: 0.4rem;
  gap: 0.4rem;
  span {
    &:first-child {
      opacity: 0.6;
    }
  }
`;
const InfoItem = styled.span`
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50vh;
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
