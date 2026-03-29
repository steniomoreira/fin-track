'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utls/toast-utils';

import { PaymentTransactionSchema, schemaPaymentTransaction } from './schema';

export async function paymentTransaction(data: PaymentTransactionSchema) {
  const session = await requireSession();

  const result = schemaPaymentTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  try {
    const { installmentId, date, amount, status } = result.data;

    await db.$transaction(async (db) => {
      await db.installment.update({
        where: {
          id: installmentId,
          userId,
        },
        data: {
          status,
        },
      });

      await db.payment.create({
        data: {
          userId,
          installmentId,
          date,
          amount,
        },
      });
    });

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Pagamento realizado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de pagamento!',
    };
  }
}
