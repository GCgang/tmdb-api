import { useQuery } from '@tanstack/react-query';
import { makeImagePath } from '../utils/makeImagePath';
import { IMovie, IMovieDetail } from '../api/types';
import { useTmdbApi } from '../context/TmdbApiContext';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
interface IMovieDetailProps {
  movie: IMovie;
}

export default function MovieDetail({ movie }: IMovieDetailProps) {
  const { tmdb } = useTmdbApi();
  const { id, backdrop_path, title } = movie;
  const navigate = useNavigate();
  const {
    data: movieDetails,
    isLoading,
    error,
  } = useQuery<IMovieDetail>({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdb.movieDetails(id),
  });
  const handleClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`, { state: { movieDetails } });
  };
  return (
    <div>
      <div>
        <img src={makeImagePath(backdrop_path || '')} alt={title} />
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error...</div>
        ) : (
          movieDetails && (
            <div>
              <h4>{movieDetails.runtime}</h4>
              <button onClick={() => handleClicked(id)}>
                <IoIosArrowDropdownCircle />
              </button>
              {movieDetails.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
