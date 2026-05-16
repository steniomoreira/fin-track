import { format } from 'date-fns';
import { endOfDay, startOfDay } from 'date-fns';
import { z } from 'zod';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { currencyToCents } from '@/utils/currency-utils';

const baseSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, { message: 'A descrição deve ter no mínimo 3 caracteres' }),
  dueDate: z.date(),
  type: z.enum([INCOME, EXPENSE], { message: 'Selecione um tipo' }),
  amount: z
    .number()
    .min(0.01, { message: 'Informe um valor' })
    .transform((value) => currencyToCents(value)),
  categoryId: z.cuid('Selecione uma categoria'),
});

export const schemaAddTransactionForm = ({
  closingDay,
  referenceMonth,
}: {
  closingDay: number;
  referenceMonth: Date;
}) => {
  const year = referenceMonth.getUTCFullYear();
  const month = referenceMonth.getUTCMonth();

  const minDate = startOfDay(new Date(year, month, 1));
  const maxDate = endOfDay(new Date(year, month, closingDay));

  return baseSchema.extend({
    dueDate: z
      .date()
      .min(minDate, {
        message: `A data deve ser a partir de ${format(minDate, 'dd/MM/yyyy')}`,
      })
      .max(maxDate, {
        message: `A data deve ser até ${format(maxDate, 'dd/MM/yyyy')}`,
      }),
  });
};

export type AddTransactionFormData = z.infer<typeof baseSchema>;
