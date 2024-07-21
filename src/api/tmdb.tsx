import TmdbClient from './tmdbClient';

export default class Tmdb {
  apiClient: TmdbClient;
  constructor(apiClient: TmdbClient) {
    this.apiClient = apiClient;
  }
}
