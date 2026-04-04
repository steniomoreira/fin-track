'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { installmentSelect } from '@/types/transactions/installment';

export async function getInstallmentTransactionBySlug(slug: string) {
  const session = await requireSession();

  try {
    const installment = await db.installment.findUnique({
      where: {
        slug,
        userId: session.user.id,
      },
      select: installmentSelect,
    });

    return { installment };
  } catch (error) {
    console.error(error);
    return { installment: null };
  }
}
