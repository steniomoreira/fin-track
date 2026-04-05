import z from 'zod';

import { currencyToCents, formatCurrency } from '@/utils/currency-utils';

export const schemaPaymentTransactionForm = (payAmount: number) =>
  z
    .object({
      date: z.date(),
      paymentAmount: z
        .number()
        .min(0.01, { message: 'Informe um valor' })
        .transform((value) => currencyToCents(value)),
    })
    .refine((data) => data.paymentAmount <= currencyToCents(payAmount), {
      message: `O valor máximo permitido é de ${formatCurrency(currencyToCents(payAmount))}`,
      path: ['paymentAmount'],
    })
    .refine((data) => data.date <= new Date(), {
      message: `Não é permitido data futura para pagamento`,
      path: ['date'],
    });

export type PaymentTransactionFormData = z.infer<
  ReturnType<typeof schemaPaymentTransactionForm>
>;
