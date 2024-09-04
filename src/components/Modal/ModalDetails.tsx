import styled from 'styled-components';
import { useTmdbApi } from '../../context/TmdbApiContext';
import { useQuery } from '@tanstack/react-query';
import { makeImagePath } from '../../utils/makeImagePath';
import { IMovieDetail } from '../../api/types';
import WishListButton from '../WishListButton';

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

  return (
    <>
      <ModalCover
        src={makeImagePath(movieDetails?.poster_path!)}
        alt={movieDetails?.title}
      />
      <TitleBar>
        <ModalTitle>{movieDetails?.title}</ModalTitle>
        <ButtonIcon>
          <WishListButton id={id} />
        </ButtonIcon>
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

const ModalCover = styled.img`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 50vh;
  min-height: 350px;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
`;
const ModalOverView = styled.p`
  font-size: 1.2rem;
  line-height: 1.2;
  margin-bottom: 1rem;
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
`;

const ButtonIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  & > *:hover {
    transform: scale(1.2);
    transition: transform 0.2s easi-in-out;
  }
`;
