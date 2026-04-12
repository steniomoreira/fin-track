import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaUpdateTransaction = z.object({
  id: z.cuid('ID inválido'),
  transactionId: z.cuid('ID da transação é obrigatório'),
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  categoryId: z.string({ message: 'Categoria inválida' }),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
  dueDate: z.date(),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  creditCardId: z.cuid('ID inválido').nullable().optional(),
});

export type UpdateTransactionParams = z.infer<typeof schemaUpdateTransaction>;
