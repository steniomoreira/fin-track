import z from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaAddTransactionInvoice = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  dueDate: z.date(),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  categoryId: z.cuid('Categoria inválida'),
  creditCardId: z.cuid('ID inválido'),
});

export type AddTransactionInvoiceParams = z.infer<
  typeof schemaAddTransactionInvoice
>;
