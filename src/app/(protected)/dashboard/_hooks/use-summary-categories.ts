import { useMemo } from 'react';

import { EXPENSE } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

export function useSummaryCategories(installments: Installment[]) {
  const expensesByCategory = useMemo(
    () =>
      installments
        .filter((i) => i.transaction.type === EXPENSE && i.transaction.category)
        .reduce(
          (acc, installment) => {
            const categoryId = installment.transaction.category!.id;
            const categoryName = installment.transaction.category!.name;

            if (!acc[categoryId]) {
              acc[categoryId] = { name: categoryName, amount: 0 };
            }

            acc[categoryId].amount += installment.amount;
            return acc;
          },
          {} as Record<string, { name: string; amount: number }>
        ),
    [installments]
  );

  const totalExpense = useMemo(
    () =>
      Object.values(expensesByCategory).reduce(
        (total, category) => total + category.amount,
        0
      ),
    [expensesByCategory]
  );

  const topFiveCategories = useMemo(
    () =>
      Object.values(expensesByCategory)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5)
        .map((category) => ({
          ...category,
          percentage:
            totalExpense > 0
              ? Math.round((category.amount / totalExpense) * 100)
              : 0,
        })),
    [expensesByCategory, totalExpense]
  );

  return { topFiveCategories, totalExpense };
}
