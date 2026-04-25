'use server';

import {
  addMonths,
  endOfDay,
  getDate,
  getDaysInMonth,
  setDate,
  startOfMonth,
} from 'date-fns';
import { revalidatePath } from 'next/cache';

import { upsertInvoice } from '@/actions/invoices/upsert-invoice';
import { TransactionType } from '@/generated/prisma/enums';
import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { date_MMMM_yyyy } from '@/utils/date-utils';
import { generateHash } from '@/utils/hash-utils';
import { toastTypes } from '@/utils/toast-utils';

import { CreateTransactionParams, schemaCreateTransaction } from './schema';
import { createInstallmentSlug } from './slug';

export async function createTransaction(data: CreateTransactionParams) {
  const session = await requireSession();

  const result = schemaCreateTransaction.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const userId = session.user.id;

  const transactionsMapped = !data.installmentGroup
    ? await Promise.all(
        Array(data.numberInstallments)
          .fill(null)
          .map(async (_, index) => {
            const baseDate = addMonths(new Date(endOfDay(data.dueDate)), index);

            const { installmentDueDate, invoiceId } = data.creditCardId
              ? await upsertInvoice({
                  baseDate,
                  type: data.type,
                  amount: data.amount,
                  creditCardId: data.creditCardId,
                })
              : {
                  installmentDueDate: baseDate,
                  invoiceId: null,
                };

            return {
              userId,
              description: data.description,
              type: data.type,
              categoryId: data.categoryId,
              numberInstallments: data.numberInstallments,
              creditCardId: data.creditCardId,
              installments: {
                userId,
                dueDate: baseDate,
                amount: data.amount,
                number: 1,
                invoiceId,
                hashCode: generateHash(),
                slug: await createInstallmentSlug(
                  `${data.description}-${date_MMMM_yyyy(installmentDueDate)}`
                ),
              },
            };
          })
      )
    : [];

  const installments = data.installmentGroup
    ? await Promise.all(
        Array(data.numberInstallments)
          .fill(null)
          .map(async (_, index) => {
            const baseDate = addMonths(new Date(endOfDay(data.dueDate)), index);
            const { installmentDueDate, invoiceId } = data.creditCardId
              ? await upsertInvoice({
                  baseDate,
                  type: data.type,
                  amount: data.amount,
                  creditCardId: data.creditCardId,
                })
              : {
                  installmentDueDate: baseDate,
                  invoiceId: null,
                };

            const slug = await createInstallmentSlug(
              `${data.description}-${date_MMMM_yyyy(installmentDueDate)}`
            );

            return {
              userId,
              dueDate: baseDate,
              slug,
              invoiceId,
              hashCode: generateHash(),
              amount: data.amount,
              number: index + 1,
            };
          })
      )
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
