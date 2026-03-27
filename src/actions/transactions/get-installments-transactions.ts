'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export async function getInstallmentsTransactions() {
  const session = await requireSession();

  try {
    const installments = await db.installment.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        transactionId: true,
        dueDate: true,
        amount: true,
        status: true,
        number: true,
        transaction: {
          select: {
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
