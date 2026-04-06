import { z } from 'zod';

export const schemaDeleteTransaction = z.object({
  installmentId: z.string().min(1, 'ID da parcela é obrigatório'),
  transactionId: z.string().min(1, 'ID da transação é obrigatório'),
});

export type DeleteTransactionParams = z.infer<typeof schemaDeleteTransaction>;
