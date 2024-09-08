export function makeImagePath(path: string | undefined, format?: string) {
  if (!path) {
    return '/noPoster.png';
  }
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${path}`;
}
