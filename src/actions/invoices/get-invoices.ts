'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { invoiceSelect } from '@/types/invoices/invoice';
import { getMonthByDate } from '@/utils/date-utils';

export interface GetInvoicesParams {
  date?: Date | string;
  creditCardName?: string;
  monthsBefore?: number;
  includeFuture?: boolean;
}

export async function getInvoices({
  date,
  creditCardName,
  monthsBefore,
  includeFuture,
}: GetInvoicesParams = {}) {
  const session = await requireSession();

  const { firstDay, lastDay } = getMonthByDate(date);

  let gteDate = firstDay;
  if (monthsBefore) {
    gteDate = new Date(firstDay);
    gteDate.setUTCMonth(gteDate.getUTCMonth() - monthsBefore);
  }

  const normalizedCardName = creditCardName?.replace(/-/g, ' ');

  try {
    const invoices = await db.invoice.findMany({
      where: {
        userId: session.user.id,
        dueDate: {
          gte: gteDate,
          ...(includeFuture ? {} : { lte: lastDay }),
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
