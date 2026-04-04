'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
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
      select: {
        id: true,
        dueDate: true,
        amount: true,
        status: true,
        number: true,
        transaction: {
          select: {
            id: true,
            description: true,
            type: true,
            numberInstallments: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            creditCard: {
              select: {
                id: true,
                name: true,
                cardNumber: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            date: true,
            amount: true,
          },
        },
      },
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
