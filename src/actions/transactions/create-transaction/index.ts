'use server';

import { addMonths, endOfDay } from 'date-fns';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { date_MMMM_yyyy } from '@/utls/date-utils';
import { generateHash } from '@/utls/hash-utils';
import { toastTypes } from '@/utls/toast-utils';

import { CreateTransactionSchema, schemaCreateTransaction } from './schema';
import { createInstallmentSlug } from './slug';

export async function createTransaction(data: CreateTransactionSchema) {
  const session = await requireSession();

  const result = schemaCreateTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  const transactionsMapped = await Promise.all(
    Array(data.numberInstallments)
      .fill(null)
      .map(async (_, index) => {
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
            hashCode: generateHash(),
            slug: await createInstallmentSlug(
              `${data.description}-${date_MMMM_yyyy(dueDate)}`
            ),
          },
        };
      })
  );

  const installments = await Promise.all(
    Array(data.numberInstallments)
      .fill(null)
      .map(async (_, index) => {
        const dueDate = addMonths(new Date(endOfDay(data.dueDate)), index);
        const slug = await createInstallmentSlug(
          `${data.description}-${date_MMMM_yyyy(dueDate)}`
        );

        return {
          userId,
          dueDate,
          slug,
          hashCode: generateHash(),
          amount: data.amount,
          number: index + 1,
        };
      })
  );

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
