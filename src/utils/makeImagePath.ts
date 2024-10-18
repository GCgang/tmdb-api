export function makeImagePath(
  path: string | undefined,
  type: string,
  format?: string
) {
  if (!path) {
    return `/no${type}.png`;
  }
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${path}`;
}
