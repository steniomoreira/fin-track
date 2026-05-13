import { Prisma } from '@/generated/prisma/client';

import { installmentSelect } from '../transactions/installment';

export const invoiceSelect = {
  id: true,
  slug: true,
  dueDate: true,
  status: true,
  totalAmount: true,
  paidAmount: true,
  referenceMonth: true,
  payments: {
    select: {
      id: true,
      date: true,
      amount: true,
    },
  },
  creditCard: {
    select: {
      id: true,
      name: true,
      dueDay: true,
      closingDay: true,
      color: true,
      lastFourDigits: true,
      limit: true,
    },
  },
  installments: {
    select: installmentSelect,
  },
} satisfies Prisma.InvoiceSelect;

export type Invoice = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;
