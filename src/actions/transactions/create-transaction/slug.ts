import { db } from '@/lib/prisma';
import { createSlug } from '@/utils/slug-utils';

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
