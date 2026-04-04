import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaUpdateTransaction = z.object({
  id: z.string(),
  transactionId: z.string(),
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  categoryId: z.string({ message: 'Categoria inválida' }),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
  dueDate: z.date(),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  creditCardId: z.string().nullable().optional(),
});

export type UpdateTransactionSchema = z.infer<typeof schemaUpdateTransaction>;
