import { useRecoilState } from 'recoil';
import { myMovieWishList } from '../atom';

export default function useMyWishList() {
  const [myMovies, setMyMovies] = useRecoilState<number[]>(myMovieWishList);
  const MAX_ITEMS = 16;

  const isNewItem = (id: number): boolean => {
    return myMovies.every((movieId) => movieId !== id);
  };

  const isFull = () => {
    return myMovies.length >= MAX_ITEMS;
  };
  const addItem = (id: number) => {
    if (isFull()) {
      //tostmsg
      return;
    }
    setMyMovies([id, ...myMovies]);
    // tostmsg
  };
  const removeItem = (id: number) => {
    setMyMovies((movie) => movie.filter((movieId) => movieId !== id));
    // tostmsg
  };

  return { isNewItem, addItem, removeItem };
}
