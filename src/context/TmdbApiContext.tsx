import { createContext, useContext, ReactNode } from 'react';
import Tmdb from '../api/tmdb';
import TmdbClient from '../api/tmdbClient';

interface ITmdbApiContextType {
  tmdb: Tmdb;
}

interface ITmdbProviderProps {
  children: ReactNode;
}

const client = new TmdbClient();
const tmdb = new Tmdb(client);
const defaultContext: ITmdbApiContextType = { tmdb };
const TmdbApiContext = createContext<ITmdbApiContextType>(defaultContext);

export const TmdbProvider = ({ children }: ITmdbProviderProps) => {
  return (
    <TmdbApiContext.Provider value={{ tmdb }}>
      {children}
    </TmdbApiContext.Provider>
  );
};

export function useTmdbApi(): ITmdbApiContextType {
  return useContext(TmdbApiContext);
}
