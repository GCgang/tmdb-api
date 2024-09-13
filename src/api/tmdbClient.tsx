import axios, { AxiosInstance, AxiosResponse } from 'axios';

export default class TmdbClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });
  }

  async topRated(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/top_rated', {
      params: { language: 'ko', page: 1 },
    });
  }

  async popular(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/popular', {
      params: { language: 'ko', page: 1 },
    });
  }

  async upComming(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/upcoming', {
      params: { language: 'ko', page: 1 },
    });
  }

  async NowPlaying(): Promise<AxiosResponse> {
    return this.httpClient.get('/movie/now_playing', {
      params: { language: 'ko', page: 1 },
    });
  }

  async movieDetails(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}`, {
      params: { language: 'ko', page: 1 },
    });
  }

  async movieImages(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}/images`);
  }

  async search(
    query: string | undefined,
    page: number = 1
  ): Promise<AxiosResponse> {
    return this.httpClient.get('/search/movie', {
      params: { query, language: 'ko', page },
    });
  }

  async similar(movieId: number): Promise<AxiosResponse> {
    return this.httpClient.get(`/movie/${movieId}/similar`, {
      params: { language: 'ko', page: 1 },
    });
  }
}
