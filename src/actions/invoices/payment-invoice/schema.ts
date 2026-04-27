import { z } from 'zod';

import { invoiceStatus } from '@/constants/invoices-constants';

export function paymentInvoiceSchema() {
  return z.object({
    invoiceId: z.cuid('ID da fatura é obrigatório'),
    date: z.date(),
    amount: z.number().min(1, { message: 'Informe um valor' }),
    status: z.enum([invoiceStatus.PAID, invoiceStatus.PARTIAL]),
  });
}

export type PaymentInvoiceParams = z.infer<
  ReturnType<typeof paymentInvoiceSchema>
>;
