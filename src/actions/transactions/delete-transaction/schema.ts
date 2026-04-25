import { z } from 'zod';

export const schemaDeleteTransaction = z.object({
  installmentId: z.cuid('ID da parcela é obrigatório'),
  transactionId: z.cuid('ID da transação é obrigatório'),
  invoiceId: z.cuid('ID da fatura é obrigatório').optional(),
  amount: z.number('Valor da parcela é obrigatório'),
});

export type DeleteTransactionParams = z.infer<typeof schemaDeleteTransaction>;
