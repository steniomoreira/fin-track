import { Prisma } from '@/generated/prisma/client';

export const installmentSelect = {
  id: true,
  dueDate: true,
  hashCode: true,
  slug: true,
  amount: true,
  status: true,
  number: true,
  invoiceId: true,
  transaction: {
    select: {
      id: true,
      description: true,
      type: true,
      numberInstallments: true,
      category: {
        select: {
          id: true,
          name: true,
          icon: true,
          color: true,
        },
      },
      creditCard: {
        select: {
          id: true,
          name: true,
          closingDay: true,
          lastFourDigits: true,
        },
      },
    },
  },
  payments: {
    select: {
      id: true,
      date: true,
      amount: true,
    },
    orderBy: { date: 'asc' as const },
  },
} satisfies Prisma.InstallmentSelect;

export type Installment = Prisma.InstallmentGetPayload<{
  select: typeof installmentSelect;
}>;
