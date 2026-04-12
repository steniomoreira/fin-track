import z from 'zod';

import { COLOR_MAP } from '@/constants/colors-constants';

export const schemaUpsertCreditCard = z.object({
  id: z.cuid('ID inválido').optional(),
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  color: z.enum(Object.keys(COLOR_MAP) as [string, ...string[]]),
  cardNumber: z
    .string()
    .trim()
    .min(16, { message: 'Número do cartão deve ter 16 dígitos' })
    .max(16, { message: 'Número do cartão deve ter 16 dígitos' }),
});

export type UpsertCreditCardParams = z.infer<typeof schemaUpsertCreditCard>;
