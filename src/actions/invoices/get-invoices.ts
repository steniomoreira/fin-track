'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { invoiceSelect } from '@/types/invoices/invoice';
import { getMonthByDate } from '@/utils/date-utils';

export async function getInvoices(date?: Date) {
  const session = await requireSession();

  const { firstDay, lastDay } = getMonthByDate(date);

  try {
    const invoices = await db.invoice.findMany({
      where: {
        userId: session.user.id,
        dueDate: {
          gte: firstDay,
          lte: lastDay,
        },
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
