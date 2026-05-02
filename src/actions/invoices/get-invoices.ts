'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { invoiceSelect } from '@/types/invoices/invoice';
import { getMonthByDate } from '@/utils/date-utils';

export interface GetInvoicesParams {
  date?: Date | string;
  creditCardName?: string;
}

export async function getInvoices({
  date,
  creditCardName,
}: GetInvoicesParams = {}) {
  const session = await requireSession();

  const { firstDay, lastDay } = getMonthByDate(date);

  const normalizedCardName = creditCardName?.replace(/-/g, ' ');

  try {
    const invoices = await db.invoice.findMany({
      where: {
        userId: session.user.id,
        dueDate: {
          gte: firstDay,
          lte: lastDay,
        },
        ...(creditCardName && {
          creditCard: {
            name: {
              equals: normalizedCardName,
              mode: 'insensitive',
            },
          },
        }),
      },
      orderBy: [{ dueDate: 'asc' }, { id: 'asc' }],
      select: invoiceSelect,
    });

    return { invoices };
  } catch (error) {
    console.error(error);
    return { invoices: [] };
  }
}
