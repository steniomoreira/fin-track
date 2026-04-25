import { z } from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaCreateInvoice = z.object({
  baseDate: z.date({ message: 'Data base inválida' }),
  creditCardId: z.cuid('ID do cartão de crédito inválido'),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
});

export type CreateInvoiceParams = z.infer<typeof schemaCreateInvoice>;
