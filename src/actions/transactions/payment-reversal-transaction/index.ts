'use server';

import { revalidatePath } from 'next/cache';

import { status } from '@/constants/transactions-contants';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utls/toast-utils';

export async function paymentReversalTransaction(
  installmentId: string,
  paymentId: string
) {
  const session = await requireSession();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

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
