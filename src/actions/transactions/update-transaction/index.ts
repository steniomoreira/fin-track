'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { schemaUpdateTransaction, UpdateTransactionSchema } from './schema';

export async function updateInstallments(data: UpdateTransactionSchema) {
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

    await db.$transaction(async (db) => {
      if (description || categoryId || type || creditCardId) {
        await db.transaction.update({
          where: {
            userId,
            id: transactionId,
          },
          data: {
            description,
            categoryId,
            creditCardId,
            type,
          },
        });
      }

      if (dueDate || amount) {
        await db.installment.update({
          where: {
            userId,
            id,
            transactionId,
          },
          data: {
            dueDate,
            amount,
          },
        });
      }
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
