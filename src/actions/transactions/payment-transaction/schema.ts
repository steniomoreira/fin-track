import z from 'zod';

import { status } from '@/constants/transactions-contants';

export const schemaPaymentTransaction = z.object({
  installmentId: z.cuid('ID da parcela é obrigatório'),
  date: z.date(),
  amount: z.number().min(1, { message: 'Informe um valor' }),
  status: z.enum([status.PAID, status.PARTIAL]),
});

export type PaymentTransactionParams = z.infer<typeof schemaPaymentTransaction>;
