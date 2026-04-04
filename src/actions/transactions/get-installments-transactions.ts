'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { installmentSelect } from '@/types/transactions/installment';
import { getMonthByDate } from '@/utls/date-utils';

export async function getInstallmentsTransactions(date?: Date) {
  const session = await requireSession();

  const { firstDay, lastDay } = getMonthByDate(date);

  try {
    const installments = await db.installment.findMany({
      where: {
        userId: session.user.id,
        dueDate: {
          gte: firstDay,
          lte: lastDay,
        },
      },
      select: installmentSelect,
      orderBy: {
        dueDate: 'asc',
      },
    });

    return { installments };
  } catch (error) {
    console.error(error);
    return { installments: [] };
  }
}
