import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { currencyToCents } from '@/utils/currency-utils';

export const schemaUpdateTransactionForm = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  categoryId: z.cuid('Categoria inválida'),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
  dueDate: z.date(),
  amount: z
    .number()
    .min(0.01, { message: 'Informe um valor' })
    .transform((value) => currencyToCents(value)),
  creditCardId: z.cuid('Selecione um cartão de crédito').nullable().optional(),
});

export type UpdateTransactionFormData = z.infer<
  typeof schemaUpdateTransactionForm
>;
