'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { PaymentInvoiceParams, paymentInvoiceSchema } from './schema';

export async function paymentInvoice(data: PaymentInvoiceParams) {
  const session = await requireSession();

  const result = paymentInvoiceSchema().safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  try {
    const { invoiceId, date, amount, status } = result.data;

    await db.$transaction(async (db) => {
      await db.invoice.update({
        where: {
          id: invoiceId,
          userId,
        },
        data: {
          paidAmount: {
            increment: amount,
          },
          status,
        },
      });

      await db.invoicePayment.create({
        data: {
          invoiceId,
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
