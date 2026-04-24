import { Prisma } from '@/generated/prisma/client';

export const creditCardSelect = {
  id: true,
  name: true,
  lastFourDigits: true,
  color: true,
  closingDay: true,
  dueDay: true,
  limit: true,
} satisfies Prisma.CreditCardSelect;

export type CreditCard = Prisma.CreditCardGetPayload<{
  select: typeof creditCardSelect;
}>;
