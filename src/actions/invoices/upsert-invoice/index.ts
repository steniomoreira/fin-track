'use server';

import {
  addMonths,
  getDate,
  getDaysInMonth,
  setDate,
  startOfMonth,
} from 'date-fns';

import { TransactionType } from '@/generated/prisma/enums';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';

import { CreateInvoiceParams, schemaCreateInvoice } from './schema';

export async function upsertInvoice(data: CreateInvoiceParams) {
  const session = await requireSession();

  const result = schemaCreateInvoice.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const { baseDate, amount, type, creditCardId } = result.data;

  const userId = session.user.id;

  const creditCard = await db.creditCard.findUnique({
    where: { id: creditCardId },
  });

  if (!creditCard) {
    throw new Error('Cartão de crédito não encontrado');
  }

  try {
    const { closingDay, dueDay } = creditCard;
    let referenceMonth = startOfMonth(baseDate);

    let installmentDueDate = baseDate;

    let currentClosingDay = Math.min(
      closingDay,
      getDaysInMonth(referenceMonth)
    );
    let closingDate = setDate(referenceMonth, currentClosingDay);

    if (getDate(baseDate) > currentClosingDay) {
      referenceMonth = addMonths(referenceMonth, 1);
      currentClosingDay = Math.min(closingDay, getDaysInMonth(referenceMonth));
      closingDate = setDate(referenceMonth, currentClosingDay);
    }

    let currentDueDay = Math.min(dueDay, getDaysInMonth(referenceMonth));
    let invoiceDueDate = setDate(referenceMonth, currentDueDay);
    if (dueDay < closingDay) {
      invoiceDueDate = addMonths(invoiceDueDate, 1);
      currentDueDay = Math.min(dueDay, getDaysInMonth(invoiceDueDate));
      invoiceDueDate = setDate(invoiceDueDate, currentDueDay);
    }

    installmentDueDate = invoiceDueDate;

    const invoice = await db.invoice.upsert({
      where: {
        creditCardId_referenceMonth: {
          creditCardId: creditCard.id,
          referenceMonth,
        },
      },
      update: {
        totalAmount:
          type === TransactionType.INCOME
            ? { decrement: amount }
            : { increment: amount },
      },
      create: {
        userId,
        creditCardId: creditCard.id,
        referenceMonth,
        closingDate,
        dueDate: invoiceDueDate,
        totalAmount: type === TransactionType.EXPENSE ? amount : -amount,
      },
    });

    return { installmentDueDate, invoiceId: invoice.id };
  } catch (error) {
    console.error(error);
    throw new Error('Ocorreu um erro no processo de criar a fatura!');
  }
}
