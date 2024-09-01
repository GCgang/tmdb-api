import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'myWishList',
  storage: localStorage,
});

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const myMovieWishList = atom({
  key: 'myMovies',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
