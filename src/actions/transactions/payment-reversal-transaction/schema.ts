import z from 'zod';

export const schemaPaymentReversalTransaction = z.object({
  installmentId: z.string(),
  paymentId: z.string(),
});

export type PaymentReversalTransactionParams = z.infer<
  typeof schemaPaymentReversalTransaction
>;
