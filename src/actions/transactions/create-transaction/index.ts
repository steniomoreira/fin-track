'use server';

import { addMonths, endOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utls/toast-utils';

import { CreateTransactionSchema, schemaCreateTransaction } from './schema';

export async function createTransaction(data: CreateTransactionSchema) {
  const session = await requireSession();

  const result = schemaCreateTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  const transactionsMapped = Array(data.numberInstallments)
    .fill(null)
    .map((_, index) => {
      const dueDate = addMonths(new Date(endOfDay(data.dueDate)), index);

      return {
        userId,
        description: data.description,
        type: data.type,
        categoryId: data.categoryId,
        numberInstallments: data.numberInstallments,
        creditCardId: data.creditCardId,
        installments: {
          userId,
          dueDate,
          amount: data.amount,
          number: 1,
        },
      };
    });

  const installments = Array(data.numberInstallments)
    .fill(null)
    .map((_, index) => {
      const dueDate = addMonths(new Date(endOfDay(data.dueDate)), index);

      return {
        userId,
        dueDate,
        amount: data.amount,
        number: index + 1,
      };
    });

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
                    dueDate: installments.dueDate,
                    amount: installments.amount,
                    number: installments.number,
                  },
                },
              },
            })
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
