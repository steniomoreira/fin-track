import { Prisma } from '@/generated/prisma/client';

export const creditCardSelect = {
  id: true,
  name: true,
  cardNumber: true,
  color: true,
} satisfies Prisma.CreditCardSelect;

export type CreditCard = Prisma.CreditCardGetPayload<{
  select: typeof creditCardSelect;
}>;
