import z from 'zod';

export const shemaDeleteCreditCard = z.object({
  id: z.string().min(1, { message: 'ID inválido' }),
});

export type DeleteCreditCardParams = z.infer<typeof shemaDeleteCreditCard>;
