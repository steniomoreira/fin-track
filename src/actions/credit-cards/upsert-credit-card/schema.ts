import z from 'zod';

import { COLOR_MAP } from '@/constants/colors-constants';

export const schemaUpsertCreditCard = z.object({
  id: z.cuid('ID inválido').optional(),
  name: z.string().trim().min(2, { message: 'Nome inválido' }),
  lastFourDigits: z
    .string()
    .trim()
    .length(4, { message: 'Últimos 4 dígitos inválidos' }),
  color: z.enum(Object.keys(COLOR_MAP) as [string, ...string[]]),
  closingDay: z
    .number({ message: 'Informe o dia de fechamento' })
    .min(1, { message: 'Dia inválido' })
    .max(31, { message: 'Dia inválido' }),
  dueDay: z
    .number({ message: 'Informe o dia de vencimento' })
    .min(1, { message: 'Dia inválido' })
    .max(31, { message: 'Dia inválido' }),
  limit: z.coerce
    .number()
    .min(0.01, { message: 'Informe um valor' })
    .optional(),
});

export type UpsertCreditCardParams = z.infer<typeof schemaUpsertCreditCard>;
