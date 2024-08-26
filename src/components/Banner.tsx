import styled from 'styled-components';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';

interface IBannerProps {
  isLoading: boolean;
  movies: IMovie[] | undefined;
}

const BannerContainer = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

export default function Banner({ isLoading, movies }: IBannerProps) {
  if (!movies) return <div>empty</div>;
  const movie = movies[0];
  const movieBackDropPath = movie?.backdrop_path || '';
  const { title, overview } = movie;
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <BannerContainer bgPhoto={makeImagePath(movieBackDropPath || '')}>
      <Title>{title}</Title>
      <Overview>{overview}</Overview>
    </BannerContainer>
  );
}
