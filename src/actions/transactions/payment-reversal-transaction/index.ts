'use server';

import { revalidatePath } from 'next/cache';

import { status } from '@/constants/transactions-contants';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import {
  PaymentReversalTransactionParams,
  schemaPaymentReversalTransaction,
} from './schema';

export async function paymentReversalTransaction(
  data: PaymentReversalTransactionParams
) {
  const session = await requireSession();

  const result = schemaPaymentReversalTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const { installmentId, paymentId } = result.data;

  const userId = session.user.id;

  try {
    const installment = await db.installment.findUnique({
      where: {
        id: installmentId,
        userId,
      },
      select: {
        _count: {
          select: { payments: true },
        },
      },
    });

    await db.installment.update({
      where: {
        id: installmentId,
        userId,
      },
      data: {
        status:
          (installment && installment?._count.payments - 1) === 0
            ? status.PENDING
            : status.PARTIAL,
      },
    });

    await db.payment.delete({
      where: {
        id: paymentId,
        userId,
      },
    });

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Estorno realizado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de estorno da parcela!',
    };
  }
}
