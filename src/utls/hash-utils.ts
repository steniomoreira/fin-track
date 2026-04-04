export function generateHash(length = 9): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}
