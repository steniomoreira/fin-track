import { Prisma } from '@/generated/prisma/client';

export const invoiceSelect = {
  id: true,
  slug: true,
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
      limit: true,
    },
  },
  installments: {
    select: {
      id: true,
      slug: true,
      dueDate: true,
      amount: true,
      number: true,
      transaction: {
        select: {
          description: true,
          type: true,
          numberInstallments: true,
          category: {
            select: {
              name: true,
              color: true,
              icon: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.InvoiceSelect;

export type Invoice = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;
