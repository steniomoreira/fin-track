import { addMonths } from 'date-fns';

import { upsertInvoice } from '@/actions/invoices/upsert-invoice';
import { date_MMMM_yyyy } from '@/utils/date-utils';
import { generateHash } from '@/utils/hash-utils';

import { CreateTransactionParams } from './schema';
import { createInstallmentSlug } from './slug';

export const getInstallmentBaseDate = (dueDate: Date, index: number) => {
  return addMonths(
    new Date(
      Date.UTC(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate())
    ),
    index
  );
};

export const resolveInstallmentInvoice = async (
  data: CreateTransactionParams,
  baseDate: Date
) => {
  if (!data.creditCardId) {
    return { invoiceId: null };
  }

  return upsertInvoice({
    baseDate,
    type: data.type,
    amount: data.amount,
    creditCardId: data.creditCardId,
  });
};

export const generateBaseInstallments = async (
  data: CreateTransactionParams
) => {
  return Promise.all(
    Array(data.numberInstallments)
      .fill(null)
      .map(async (_, index) => {
        const baseDate = getInstallmentBaseDate(data.dueDate, index);

        const { invoiceId } = await resolveInstallmentInvoice(data, baseDate);

        const slug = await createInstallmentSlug(
          `${data.description}-${date_MMMM_yyyy(baseDate)}`
        );

        return {
          dueDate: baseDate,
          invoiceId,
          slug,
          hashCode: generateHash(),
          amount: data.amount,
          number: index + 1,
        };
      })
  );
};
