'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { categorySelect } from '@/types/categories/category';

export async function getCategories() {
  const session = await requireSession();

  try {
    const categories = await db.category.findMany({
      where: { userId: session.user.id },
      select: categorySelect,
      orderBy: { createdAt: 'asc' },
    });

    return { categories };
  } catch (error) {
    console.error(error);
    return { categories: [] };
  }
}
