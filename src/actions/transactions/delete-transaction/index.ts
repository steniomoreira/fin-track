'use server';

import { revalidatePath } from 'next/cache';

import { recalculateInvoiceTotal } from '@/actions/invoices/utils/recalculate-invoice-total';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { DeleteTransactionParams, schemaDeleteTransaction } from './schema';

export async function deleteTransaction(data: DeleteTransactionParams) {
  const session = await requireSession();

  const result = schemaDeleteTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const { installmentId, transactionId } = result.data;

  const userId = session.user.id;

  try {
    await db.$transaction(async (tx) => {
      const installment = await tx.installment.findUnique({
        where: { id: installmentId, userId },
        select: { invoiceId: true },
      });

      const invoiceId = installment?.invoiceId ?? null;

      const transaction = await tx.transaction.findUnique({
        where: { id: transactionId, userId },
        select: {
          _count: { select: { installments: true } },
        },
      });

      if (transaction && transaction._count.installments === 1) {
        await tx.transaction.delete({
          where: { id: transactionId, userId },
        });
      } else {
        await tx.installment.delete({
          where: { id: installmentId, userId },
        });
      }

      if (invoiceId) {
        await recalculateInvoiceTotal(tx, invoiceId);
      }
    });

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Transação deletada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de deletar a transaction!',
    };
  }
}
