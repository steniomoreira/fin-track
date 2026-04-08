import { Prisma } from '@/generated/prisma/client';

export const categorySelect = {
  id: true,
  name: true,
  description: true,
  icon: true,
  color: true,
} satisfies Prisma.CategorySelect;

export type Category = Prisma.CategoryGetPayload<{
  select: typeof categorySelect;
}>;
