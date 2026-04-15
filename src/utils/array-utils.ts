export function sortByDateAsc<T extends { date: Date }>(array: T[]): T[] {
  return array
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function isEmptyArray(array: unknown[]): boolean {
  return Array.isArray(array) && array.length === 0;
}
