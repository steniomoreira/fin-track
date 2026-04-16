import { useMemo } from 'react';

import { EXPENSE, INCOME, status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

export function useDashboard(installments: Installment[]) {
  const {
    totalBalance,
    totalRealized,
    totalIncome,
    totalExpense,
    realizedIncome,
    realizedExpense,
  } = useMemo(() => {
    return installments.reduce(
      (acc, installment) => {
        const isPaid =
          installment.status === status.PAID ||
          installment.status === status.PARTIAL;

        if (installment.transaction.type === INCOME) {
          acc.totalIncome += installment.amount;
          acc.totalBalance += installment.amount;

          if (isPaid) {
            const totalPaid = installment.payments.reduce(
              (acc, payment) => acc + payment.amount,
              0
            );

            acc.totalRealized += totalPaid;
            acc.realizedIncome += totalPaid;
          }
        } else if (installment.transaction.type === EXPENSE) {
          acc.totalExpense += installment.amount;
          acc.totalBalance -= installment.amount;

          if (isPaid) {
            const totalPaid = installment.payments.reduce(
              (acc, payment) => acc + payment.amount,
              0
            );

            acc.totalRealized -= totalPaid;
            acc.realizedExpense += totalPaid;
          }
        }
        return acc;
      },
      {
        totalBalance: 0,
        totalRealized: 0,
        totalIncome: 0,
        totalExpense: 0,
        realizedIncome: 0,
        realizedExpense: 0,
      }
    );
  }, [installments]);

  const total = totalIncome + totalExpense;
  const totalRealizedAbs = realizedIncome + realizedExpense;

  const incomePercentage =
    total > 0 ? Math.round((totalIncome / total) * 100) : 0;
  const expensePercentage =
    total > 0 ? Math.round((totalExpense / total) * 100) : 0;

  const realizedPercentage =
    total > 0 ? Math.round((totalRealizedAbs / total) * 100) : 0;

  return {
    totalBalance,
    totalRealized,
    totalIncome,
    totalExpense,
    realizedPercentage,
    incomePercentage,
    expensePercentage,
  };
}
