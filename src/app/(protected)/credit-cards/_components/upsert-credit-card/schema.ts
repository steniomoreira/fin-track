import z from 'zod';

import { COLOR_MAP } from '@/constants/colors-constants';

export const schemaUpsertCreditCardForm = z.object({
  name: z.string().trim().min(2, { message: 'Nome inválido' }),
  color: z.enum(Object.keys(COLOR_MAP) as [string, ...string[]]),
  cardNumber: z
    .string()
    .trim()
    .min(16, { message: 'Número do cartão deve ter 16 dígitos' })
    .max(16, { message: 'Número do cartão deve ter 16 dígitos' }),
});

export type UpsertCreditCardFormData = z.infer<
  typeof schemaUpsertCreditCardForm
>;
