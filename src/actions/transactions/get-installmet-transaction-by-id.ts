'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

export async function getInstallmentTransactionById(id: string) {
  const session = await requireSession();

  try {
    const installment = await db.installment.findUnique({
      where: {
        id,
        userId: session.user.id,
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
          orderBy: {
            date: 'asc',
          },
        },
      },
    });

    return { installment };
  } catch (error) {
    console.error(error);
    return { installment: null };
  }
}
