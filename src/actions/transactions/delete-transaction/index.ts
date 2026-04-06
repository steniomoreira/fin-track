'use server';

import { revalidatePath } from 'next/cache';

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
    const transaction = await db.transaction.findUnique({
      where: {
        id: transactionId,
        userId,
      },
      select: {
        _count: {
          select: { installments: true },
        },
      },
    });

    if (transaction && transaction?._count.installments === 1) {
      await db.transaction.delete({
        where: {
          id: transactionId,
          userId,
        },
      });
    } else {
      await db.installment.delete({
        where: {
          id: installmentId,
          userId,
        },
      });
    }

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
