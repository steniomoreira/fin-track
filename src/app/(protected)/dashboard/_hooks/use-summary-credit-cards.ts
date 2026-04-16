import { useMemo } from 'react';

import { EXPENSE } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

export function useSummaryCreditCards(installments: Installment[]) {
  const creditCardsSummary = useMemo(() => {
    const summary = installments
      .filter((i) => i.transaction.type === EXPENSE && i.transaction.creditCard)
      .reduce(
        (acc, installment) => {
          const creditCardId = installment.transaction.creditCard!.id;
          const { name, cardNumber } = installment.transaction.creditCard!;

          if (!acc[creditCardId]) {
            acc[creditCardId] = {
              id: creditCardId,
              name,
              cardNumber,
              amount: 0,
            };
          }

          acc[creditCardId].amount += installment.amount;
          return acc;
        },
        {} as Record<string, { id: string; name: string; cardNumber: string; amount: number }>
      );

    return Object.values(summary).sort((a, b) => b.amount - a.amount);
  }, [installments]);

  const totalCreditCardExpense = useMemo(
    () => creditCardsSummary.reduce((total, card) => total + card.amount, 0),
    [creditCardsSummary]
  );

  return { creditCardsSummary, totalCreditCardExpense };
}
