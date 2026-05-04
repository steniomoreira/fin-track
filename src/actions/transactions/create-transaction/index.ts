'use server';

import { revalidatePath } from 'next/cache';

import { recalculateInvoiceTotal } from '@/actions/invoices/utils/recalculate-invoice-total';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { CreateTransactionParams, schemaCreateTransaction } from './schema';
import { generateBaseInstallments } from './utils';

export async function createTransaction(data: CreateTransactionParams) {
  const session = await requireSession();

  const result = schemaCreateTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  const baseInstallments = await generateBaseInstallments(data);

  const transactionsMapped = !data.installmentGroup
    ? baseInstallments.map((installment) => ({
        userId,
        description: data.description,
        type: data.type,
        categoryId: data.categoryId,
        numberInstallments: data.numberInstallments,
        creditCardId: data.creditCardId,
        installments: {
          userId,
          dueDate: installment.dueDate,
          amount: installment.amount,
          number: 1,
          invoiceId: installment.invoiceId,
          hashCode: installment.hashCode,
          slug: installment.slug,
        },
      }))
    : [];

  const installments = data.installmentGroup
    ? baseInstallments.map((installment) => ({
        userId,
        dueDate: installment.dueDate,
        slug: installment.slug,
        invoiceId: installment.invoiceId,
        hashCode: installment.hashCode,
        amount: installment.amount,
        number: installment.number,
      }))
    : [];

  try {
    const {
      description,
      type,
      categoryId,
      creditCardId,
      installmentGroup,
      numberInstallments,
    } = result.data;

    if (installmentGroup) {
      await db.transaction.create({
        data: {
          userId,
          description,
          type,
          categoryId,
          creditCardId,
          numberInstallments,
          installments: {
            createMany: {
              data: installments,
            },
          },
        },
      });
    } else {
      await db.$transaction(
        transactionsMapped.map(
          ({ description, type, categoryId, installments }) =>
            db.transaction.create({
              data: {
                userId,
                description,
                type,
                categoryId,
                creditCardId,
                installments: {
                  create: {
                    userId,
                    hashCode: installments.hashCode,
                    slug: installments.slug,
                    dueDate: installments.dueDate,
                    amount: installments.amount,
                    number: installments.number,
                    invoiceId: installments.invoiceId,
                  },
                },
              },
            })
        )
      );
    }

    const invoicesToRecalculate = new Set(
      baseInstallments
        .map((inst) => inst.invoiceId)
        .filter(Boolean) as string[]
    );

    if (invoicesToRecalculate.size > 0) {
      await Promise.all(
        [...invoicesToRecalculate].map((invoiceId) =>
          recalculateInvoiceTotal(db, invoiceId)
        )
      );
    }

    revalidatePath('/transactions');

    return {
      type: toastTypes.SUCCESS,
      message: 'Transação criada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo da criação da transação!',
    };
  }
}
