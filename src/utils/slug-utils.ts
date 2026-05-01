export function createSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function parseSlugToDate(slug: string): Date {
  const parts = slug.split('-');

  const month = parts.find((p) => /^\d{2}$/.test(p));
  const year = parts.find((p) => /^\d{4}$/.test(p));

  if (!month || !year) {
    throw new Error(`Não foi possível extrair data do slug: "${slug}"`);
  }

  return new Date(`${year}-${month}-01`);
}
