'use server';

import { revalidatePath } from 'next/cache';

import { recalculateInvoiceTotal } from '@/actions/invoices/utils/recalculate-invoice-total';
import { generateBaseInstallments } from '@/actions/transactions/create-transaction/utils';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import {
  AddTransactionInvoiceParams,
  schemaAddTransactionInvoice,
} from './schema';

export async function addTransactionInvoice(data: AddTransactionInvoiceParams) {
  const session = await requireSession();

  const result = schemaAddTransactionInvoice.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  const [baseInstallment] = await generateBaseInstallments({
    ...data,
    numberInstallments: 1,
    installmentGroup: false,
  });

  try {
    const { description, type, categoryId, creditCardId } = result.data;

    await db.transaction.create({
      data: {
        userId,
        description,
        type,
        categoryId,
        creditCardId,
        installments: {
          create: {
            userId,
            hashCode: baseInstallment.hashCode,
            slug: baseInstallment.slug,
            dueDate: baseInstallment.dueDate,
            amount: baseInstallment.amount,
            number: baseInstallment.number,
            invoiceId: baseInstallment.invoiceId,
          },
        },
      },
    });

    if (baseInstallment.invoiceId) {
      await recalculateInvoiceTotal(db, baseInstallment.invoiceId);
    }

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Transação adicionada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo da criação da transação!',
    };
  }
}
