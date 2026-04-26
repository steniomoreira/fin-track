import { Prisma } from '@/generated/prisma/client';

export const invoiceSelect = {
  id: true,
  dueDate: true,
  status: true,
  totalAmount: true,
  paidAmount: true,
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
      closingDay: true,
      color: true,
      lastFourDigits: true,
    },
  },
} satisfies Prisma.InvoiceSelect;

export type Invoice = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;
