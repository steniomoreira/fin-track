'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { invoiceSelect } from '@/types/invoices/invoice';

export async function getInvoicesBySlug(slug: string) {
  const session = await requireSession();

  try {
    const invoice = await db.invoice.findUnique({
      where: {
        slug,
        userId: session.user.id,
      },
      select: invoiceSelect,
    });

    return { invoice };
  } catch (error) {
    console.error(error);
    return { invoice: null };
  }
}
