import { useMemo } from 'react';

import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

export function useDashboard(installments: Installment[]) {
  const { totalBalance, totalIncome, totalExpense } = useMemo(() => {
    return installments.reduce(
      (acc, installment) => {
        if (installment.transaction.type === INCOME) {
          acc.totalIncome += installment.amount;
          acc.totalBalance += installment.amount;
        } else if (installment.transaction.type === EXPENSE) {
          acc.totalExpense += installment.amount;
          acc.totalBalance -= installment.amount;
        }
        return acc;
      },
      { totalBalance: 0, totalIncome: 0, totalExpense: 0 }
    );
  }, [installments]);

  const total = totalIncome + totalExpense;
  const incomePercentage = total > 0 ? Math.round((totalIncome / total) * 100) : 0;
  const expensePercentage = total > 0 ? Math.round((totalExpense / total) * 100) : 0;

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    incomePercentage,
    expensePercentage,
  };
}
