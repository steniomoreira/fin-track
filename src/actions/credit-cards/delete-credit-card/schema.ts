import z from 'zod';

export const shemaDeleteCreditCard = z.object({
  id: z.cuid('ID inválido'),
});

export type DeleteCreditCardParams = z.infer<typeof shemaDeleteCreditCard>;
