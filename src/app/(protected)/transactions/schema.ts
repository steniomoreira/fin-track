import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { currencyToCents } from '@/utls/currency-utils';

export const schemaCreateTransactionForm = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  dueDate: z.date(),
  type: z.enum([INCOME, EXPENSE], { message: 'Selecione um tipo' }),
  amount: z
    .number()
    .min(0.01, { message: 'Informe um valor' })
    .transform((value) => currencyToCents(value)),
  // numberInstallments: z.coerce
  //   .number()
  //   .positive({ message: 'Deve ter 1 parcela ou mais' }),
  // installmentGroup: z.boolean(),
  categoryId: z.string({ message: 'Selecione um categoria' }),
  creditCardId: z.string().nullable().optional(),
});
// .refine((data) => data.numberInstallments > 1 || !data.installmentGroup, {
//   message: 'Deve ter no mímino 2 lançamentos',
//   path: ['installmentGroup'],
// });

export type TransactionFormData = z.infer<typeof schemaCreateTransactionForm>;
