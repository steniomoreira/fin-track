import { z } from 'zod';

export const schemaCreateInvoice = z.object({
  baseDate: z.date({ message: 'Data base inválida' }),
  creditCardId: z.cuid('ID do cartão de crédito inválido'),
});

export type CreateInvoiceParams = z.infer<typeof schemaCreateInvoice>;

