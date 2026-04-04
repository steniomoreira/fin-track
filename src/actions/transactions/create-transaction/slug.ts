import { db } from '@/lib/prisma';

export function createSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function createInstallmentSlug(slug: string): Promise<string> {
  const base = createSlug(slug);

  const existing = await db.installment.findMany({
    where: {
      slug: {
        startsWith: base,
      },
    },
    select: { slug: true },
  });

  if (existing.length === 0) return base;

  const slugSet = new Set(existing.map((p) => p.slug));

  let i = 2;
  while (slugSet.has(`${base}-${i}`)) {
    i++;
  }

  return `${base}-${i}`;
}
