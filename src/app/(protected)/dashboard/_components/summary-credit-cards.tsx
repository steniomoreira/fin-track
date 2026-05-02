import { CreditCard } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Installment } from '@/types/transactions/installment';
import { isEmptyArray } from '@/utils/array-utils';
import { formatCurrency } from '@/utils/currency-utils';

import { useSummaryCreditCards } from '../_hooks/use-summary-credit-cards';

interface SummaryCreditCardsProps {
  installments: Installment[];
}

export function SummaryCreditCards({ installments }: SummaryCreditCardsProps) {
  const { creditCardsSummary } = useSummaryCreditCards(installments);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground flex items-center gap-4 text-sm">
          Resumo das Despesas por Cartão
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEmptyArray(creditCardsSummary) ? (
          <p className="text-muted-foreground text-sm">
            Nenhuma despesa de cartão registrada.
          </p>
        ) : (
          creditCardsSummary.map((card) => (
            <div key={card.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-muted inline-block rounded-full p-2">
                  <CreditCard className="h-4 w-4" />
                </span>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{card.name}</p>
                  <p className="text-muted-foreground text-xs">
                    **** {card.lastFourDigits}
                  </p>
                </div>
              </div>
              <p className="text-destructive text-sm font-semibold">
                - {formatCurrency(card.amount)}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
