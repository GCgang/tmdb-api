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
      params: { language: 'en-US', page: 1 },
    });
  }

  async topRated(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/top_rated');
  }

  async popular(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/popular');
  }

  async upComming(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/upcoming');
  }

  async NowPlaying(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/now_playing');
  }

  async movieDetails(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}`);
  }

  async search(query: string): Promise<AxiosResponse> {
    return this.httpClient.get('/search/movie', { params: { query } });
  }
}
