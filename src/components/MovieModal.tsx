import { useLocation } from 'react-router-dom';
import { IMovieDetail } from '../api/types';
import { makeImagePath } from '../utils/makeImagePath';
import NotFound from '../pages/NotFound';

export default function MovieModal() {
  const location = useLocation();
  const movieDetails = location.state?.movieDetails as IMovieDetail;

  if (!movieDetails) return <NotFound />;
  const {
    title,
    release_date,
    overview,
    backdrop_path,
    runtime,
    genres,
    budget,
  } = movieDetails;

  return (
    <div>
      <section>
        <div>
          <img src={makeImagePath(backdrop_path || '')} alt={title} />
        </div>
        <h2>{title}</h2>
        <span>{release_date}</span>
        <span>{runtime}</span>
        <span>{overview}</span>
        <hr />
      </section>
      <section>
        <h2>비슷한 장르 영화</h2>
        <hr />
      </section>
      <section>
        <h3>영화 상세 정보</h3>
        <span>장르</span>
        {genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </section>
      <span>수익</span>
      <span>{budget}</span>
    </div>
  );
}
