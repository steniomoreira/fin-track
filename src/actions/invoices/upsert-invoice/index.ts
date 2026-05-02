'use server';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { formatDateToMonthYear } from '@/utils/date-utils';
import { calculateInvoiceDates } from '@/utils/invoice-utils';
import { createSlug } from '@/utils/slug-utils';

import { recalculateInvoiceTotal } from '../utils/recalculate-invoice-total';
import { CreateInvoiceParams, schemaCreateInvoice } from './schema';

export async function upsertInvoice(data: CreateInvoiceParams) {
  const session = await requireSession();

  const result = schemaCreateInvoice.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const { baseDate, creditCardId } = result.data;

  const userId = session.user.id;

  const creditCard = await db.creditCard.findUnique({
    where: { id: creditCardId },
  });

  if (!creditCard) {
    throw new Error('Cartão de crédito não encontrado');
  }

  try {
    const { closingDay, dueDay } = creditCard;

    const { closingDate, invoiceDueDate, referenceMonth } =
      calculateInvoiceDates({
        baseDate,
        closingDay,
        dueDay,
      });

    const slug = createSlug(
      `${creditCard.name}-${formatDateToMonthYear(invoiceDueDate)}`
    );

    const invoice = await db.invoice.upsert({
      where: {
        creditCardId_referenceMonth: {
          creditCardId: creditCard.id,
          referenceMonth,
        },
      },
      update: {},
      create: {
        userId,
        creditCardId: creditCard.id,
        slug,
        referenceMonth,
        closingDate,
        dueDate: invoiceDueDate,
        totalAmount: 0,
      },
    });

    await recalculateInvoiceTotal(db, invoice.id);

    return { invoiceId: invoice.id };
  } catch (error) {
    console.error(error);
    throw new Error('Ocorreu um erro no processo de criar a fatura!');
  }
}
