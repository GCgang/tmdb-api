import styled from 'styled-components';
import { IMovie } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';

interface IBannerProps {
  movie: IMovie;
}

const BannerSection = styled.section<{ bgPhoto: string }>`
  position: relative;
  height: 75vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
`;

const BannerInfo = styled.div`
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  bottom: 0;
  padding: 0 40px;
`;

const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 1.4rem;
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  line-height: 1.2em;
`;

export default function Banner({ movie }: IBannerProps) {
  if (!movie) return <div>empty</div>;
  const movieBackDropPath = movie?.backdrop_path || '';
  const { title, overview } = movie;

  return (
    <BannerSection bgPhoto={makeImagePath(movieBackDropPath || '')}>
      <BannerInfo>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
      </BannerInfo>
    </BannerSection>
  );
}
