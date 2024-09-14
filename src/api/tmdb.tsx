import TmdbClient from './tmdbClient';

export default class Tmdb {
  apiClient: TmdbClient;
  constructor(apiClient: TmdbClient) {
    this.apiClient = apiClient;
  }

  async topRated() {
    const response = await this.apiClient.topRated();
    return response.data.results;
  }

  async popular() {
    const response = await this.apiClient.popular();
    return response.data.results;
  }

  async upComming() {
    const response = await this.apiClient.upComming();
    return response.data.results;
  }

  async nowPlaying() {
    const response = await this.apiClient.nowPlaying();
    return response.data.results;
  }

  async movieDetails(movieId: number) {
    const response = await this.apiClient.movieDetails(movieId);
    return response.data;
  }

  async movieImages(movieId: number) {
    const response = await this.apiClient.movieImages(movieId);
    return response.data;
  }

  async search(query: string | undefined, page: number) {
    const response = await this.apiClient.search(query, page);
    return response.data.results;
  }

  async similarMovies(movieId: number) {
    const response = await this.apiClient.similar(movieId);
    return response.data.results;
  }
}
