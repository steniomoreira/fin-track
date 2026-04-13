import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaCreateTransaction = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  dueDate: z.date(),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  numberInstallments: z
    .number()
    .positive({ message: 'Deve ter 1 parcela ou mais' }),
  installmentGroup: z.boolean(),
  categoryId: z.cuid('Categoria inválida'),
  creditCardId: z.cuid('ID inválido').nullable().optional().or(z.literal('')),
});

export type CreateTransactionParams = z.infer<typeof schemaCreateTransaction>;
