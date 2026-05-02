'use server';

import { revalidatePath } from 'next/cache';

import { PrismaClient } from '@/generated/prisma/client';
import { TransactionType } from '@/generated/prisma/enums';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { formatDateToMonthYear } from '@/utils/date-utils';
import { calculateInvoiceDates } from '@/utils/invoice-utils';
import { createSlug } from '@/utils/slug-utils';
import { toastTypes } from '@/utils/toast-utils';

import { schemaUpdateTransaction, UpdateTransactionParams } from './schema';

type TransactionClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

async function recalculateInvoiceTotal(
  tx: TransactionClient,
  invoiceId: string
) {
  const [expenses, incomes] = await Promise.all([
    tx.installment.aggregate({
      where: { invoiceId, transaction: { type: TransactionType.EXPENSE } },
      _sum: { amount: true },
    }),
    tx.installment.aggregate({
      where: { invoiceId, transaction: { type: TransactionType.INCOME } },
      _sum: { amount: true },
    }),
  ]);

  const totalAmount = (expenses._sum.amount ?? 0) - (incomes._sum.amount ?? 0);

  await tx.invoice.update({
    where: { id: invoiceId },
    data: { totalAmount },
  });
}

export async function updateInstallments(data: UpdateTransactionParams) {
  const session = await requireSession();

  const result = schemaUpdateTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  try {
    const {
      transactionId,
      description,
      categoryId,
      type,
      id,
      dueDate,
      amount,
      creditCardId,
    } = result.data;

    await db.$transaction(async (tx) => {
      const currentInstallment = await tx.installment.findUnique({
        where: { id, userId, transactionId },
        select: { invoiceId: true },
      });

      const oldInvoiceId = currentInstallment?.invoiceId ?? null;

      let newInvoiceId: string | null = null;

      if (creditCardId) {
        const creditCard = await tx.creditCard.findUnique({
          where: { id: creditCardId },
        });

        if (!creditCard) {
          throw new Error('Cartão de crédito não encontrado');
        }

        const { closingDate, invoiceDueDate, referenceMonth } =
          calculateInvoiceDates({
            baseDate: dueDate,
            closingDay: creditCard.closingDay,
            dueDay: creditCard.dueDay,
          });

        const slug = createSlug(
          `${creditCard.name}-${formatDateToMonthYear(invoiceDueDate)}`
        );

        const invoice = await tx.invoice.upsert({
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

        newInvoiceId = invoice.id;
      }

      await tx.transaction.update({
        where: { userId, id: transactionId },
        data: {
          description,
          categoryId,
          creditCardId: creditCardId || null,
          type,
        },
      });

      await tx.installment.update({
        where: { userId, id, transactionId },
        data: {
          invoiceId: newInvoiceId,
          dueDate,
          amount,
        },
      });

      const invoicesToRecalculate = new Set(
        [oldInvoiceId, newInvoiceId].filter(Boolean) as string[]
      );

      await Promise.all(
        [...invoicesToRecalculate].map((invoiceId) =>
          recalculateInvoiceTotal(tx, invoiceId)
        )
      );
    });

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Transação atualizada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de atualização!',
    };
  }
}
