import z from 'zod';

export const schemaUpsertCreditCard = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  cardNumber: z
    .string()
    .trim()
    .min(16, { message: 'Número do cartão deve ter 16 dígitos' })
    .max(16, { message: 'Número do cartão deve ter 16 dígitos' }),
});

export type UpsertCreditCardParams = z.infer<typeof schemaUpsertCreditCard>;
