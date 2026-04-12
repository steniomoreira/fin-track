'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { creditCardSelect } from '@/types/credit-cards/credit-card';

export async function getCreditCards() {
  const session = await requireSession();

  try {
    const creditCards = await db.creditCard.findMany({
      where: { userId: session.user.id },
      select: creditCardSelect,
      orderBy: { createdAt: 'asc' },
    });

    return { creditCards };
  } catch (error) {
    console.error(error);
    return { creditCards: [] };
  }
}
