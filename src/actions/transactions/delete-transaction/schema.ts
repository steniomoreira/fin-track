import { z } from 'zod';

export const schemaDeleteTransaction = z.object({
  installmentId: z.cuid('ID da parcela é obrigatório'),
  transactionId: z.cuid('ID da transação é obrigatório'),
});

export type DeleteTransactionParams = z.infer<typeof schemaDeleteTransaction>;
