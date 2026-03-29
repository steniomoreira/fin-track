'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { InstallmentTransaction } from '@/types/installment-transaction-types';
import { toastTypes } from '@/utls/toast-utils';

export async function deleteTransaction(installment: InstallmentTransaction) {
  const session = await requireSession();

  const userId = session.user.id;

  const { id, transactionId, transaction } = installment;

  try {
    if (transaction.numberInstallments) {
      await db.installment.delete({
        where: {
          id,
          userId,
        },
      });
    } else {
      await db.transaction.delete({
        where: {
          id: transactionId,
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
