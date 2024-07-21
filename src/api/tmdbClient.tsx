import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWZlMjkwMzQ0MTY0ZTVhNWJlY2UwNjE1YmQyZDcyYSIsIm5iZiI6MTcyMTIxMzU3NC44NTg4MjgsInN1YiI6IjY2OTc5OTZiZjA1ZWMxYTU1N2FhZWFmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vzdorqNPoEjahgBKLZxvGdlp427D_GNDd-PshH34088';
export default class TmdbClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      headers: { Accept: 'application/json', Authorization: `Bearer ${TOKEN}` },
    });
  }

  async topRated(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/top_rated', {
      params: { language: 'en-US', page: 1 },
    });
  }

  async popular(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/popular', {
      params: { language: 'en-US', page: 1 },
    });
  }

  async upComming(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/upcoming', {
      params: { language: 'en-US', page: 1 },
    });
  }

  async NowPlaying(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/now_playing', {
      params: { language: 'en-US', page: 1 },
    });
  }

  async movieDetails(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}`, {
      params: { language: 'en-US', page: 1 },
    });
  }

  async movieImages(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}/images`);
  }

  async search(query: string | undefined): Promise<AxiosResponse> {
    return this.httpClient.get('/search/movie', {
      params: { query, language: 'en-US', page: 1 },
    });
  }
}
