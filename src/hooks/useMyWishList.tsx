import { useRecoilState } from 'recoil';
import { myMovieWishList } from '../atom';
import { toast, Bounce } from 'react-toastify';

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
      toast.warn(`최대 저장 개수는 ${MAX_ITEMS}입니다.`, {});
      return;
    }
    setMyMovies([id, ...myMovies]);
    toast.success('위시 리스트에 저장', {});
  };
  const removeItem = (id: number) => {
    setMyMovies((movie) => movie.filter((movieId) => movieId !== id));
    toast.error('위시 리스트에서 삭제', {});
  };

  return { isNewItem, addItem, removeItem };
}
