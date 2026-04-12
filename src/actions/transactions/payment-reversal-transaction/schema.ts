import z from 'zod';

export const schemaPaymentReversalTransaction = z.object({
  installmentId: z.cuid('ID da parcela é obrigatório'),
  paymentId: z.cuid('ID do pagamento é obrigatório'),
});

export type PaymentReversalTransactionParams = z.infer<
  typeof schemaPaymentReversalTransaction
>;
