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

  const creditCard = data.creditCardId
    ? await db.creditCard.findUnique({
        where: { id: data.creditCardId },
      })
    : null;

  const transactionsMapped = !data.installmentGroup
    ? await Promise.all(
        Array(data.numberInstallments)
          .fill(null)
          .map(async (_, index) => {
            const baseDate = addMonths(new Date(endOfDay(data.dueDate)), index);
            const { installmentDueDate, invoiceId } =
              await handleInvoiceAndDueDate(
                baseDate,
                creditCard,
                userId,
                data.amount,
                data.type
              );

            return {
              userId,
              description: data.description,
              type: data.type,
              categoryId: data.categoryId,
              numberInstallments: data.numberInstallments,
              creditCardId: data.creditCardId,
              installments: {
                userId,
                dueDate: installmentDueDate,
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
            const { installmentDueDate, invoiceId } =
              await handleInvoiceAndDueDate(
                baseDate,
                creditCard,
                userId,
                data.amount,
                data.type
              );

            const slug = await createInstallmentSlug(
              `${data.description}-${date_MMMM_yyyy(installmentDueDate)}`
            );

            return {
              userId,
              dueDate: installmentDueDate,
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

async function handleInvoiceAndDueDate(
  baseDate: Date,
  creditCard: { id: string; closingDay: number; dueDay: number } | null,
  userId: string,
  amount: number,
  type: TransactionType
) {
  let installmentDueDate = baseDate;
  let invoiceId: string | undefined = undefined;

  if (creditCard) {
    const { closingDay, dueDay } = creditCard;
    let referenceMonth = startOfMonth(baseDate);

    let currentClosingDay = Math.min(
      closingDay,
      getDaysInMonth(referenceMonth)
    );
    let closingDate = setDate(referenceMonth, currentClosingDay);

    if (getDate(baseDate) > currentClosingDay) {
      referenceMonth = addMonths(referenceMonth, 1);
      currentClosingDay = Math.min(closingDay, getDaysInMonth(referenceMonth));
      closingDate = setDate(referenceMonth, currentClosingDay);
    }

    let currentDueDay = Math.min(dueDay, getDaysInMonth(referenceMonth));
    let invoiceDueDate = setDate(referenceMonth, currentDueDay);
    if (dueDay < closingDay) {
      invoiceDueDate = addMonths(invoiceDueDate, 1);
      currentDueDay = Math.min(dueDay, getDaysInMonth(invoiceDueDate));
      invoiceDueDate = setDate(invoiceDueDate, currentDueDay);
    }

    installmentDueDate = invoiceDueDate;

    const invoice = await db.invoice.upsert({
      where: {
        creditCardId_referenceMonth: {
          creditCardId: creditCard.id,
          referenceMonth,
        },
      },
      update: {
        totalAmount:
          type === TransactionType.INCOME
            ? { decrement: amount }
            : { increment: amount },
      },
      create: {
        userId,
        creditCardId: creditCard.id,
        referenceMonth,
        closingDate,
        dueDate: invoiceDueDate,
        totalAmount: type === TransactionType.EXPENSE ? amount : -amount,
      },
    });

    invoiceId = invoice.id;
  }

  return { installmentDueDate, invoiceId };
}
