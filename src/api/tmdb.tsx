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
    return response.data;
  }

  async upComming() {
    const response = await this.apiClient.upComming();
    return response.data;
  }

  async NowPlaying() {
    const response = await this.apiClient.NowPlaying();
    return response.data;
  }

  async movieDetails(movieId: number) {
    const response = await this.apiClient.movieDetails(movieId);
    return response.data;
  }

  async search(query: string) {
    const response = await this.apiClient.search(query);
    return response.data;
  }
}
