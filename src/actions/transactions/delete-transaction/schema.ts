import { z } from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';

export const schemaDeleteTransaction = z.object({
  installmentId: z.cuid('ID da parcela é obrigatório'),
  transactionId: z.cuid('ID da transação é obrigatório'),
  invoiceId: z.cuid('ID da fatura é obrigatório').optional(),
  amount: z.number('Valor da parcela é obrigatório'),
  type: z.enum([INCOME, EXPENSE], { message: 'Tipo de transação inválido' }),
});

export type DeleteTransactionParams = z.infer<typeof schemaDeleteTransaction>;
