import { TrendingDown, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';

import { useDashboard } from '../_hooks/use-dashboard';

interface SummaryCardProps {
  installments: Installment[];
  type: typeof INCOME | typeof EXPENSE;
}

export function SummaryCard({ installments, type }: SummaryCardProps) {
  const { totalIncome, totalExpense, incomePercentage, expensePercentage } = useDashboard(installments);

  const isIncome = type === INCOME;
  const percentage = isIncome ? incomePercentage : expensePercentage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground flex items-center gap-4 text-sm">
          <span
            className={`inline-block rounded-md p-1 ${isIncome ? 'bg-green-600/20 text-green-600' : 'bg-destructive/20 text-destructive'}`}
          >
            {isIncome ? (
              <TrendingUp className="h-6 w-6" />
            ) : (
              <TrendingDown className="h-6 w-6" />
            )}
          </span>
          Total de {isIncome ? 'Receitas' : 'Despesas'}
          <span
            className={`flex-1 text-right text-sm ${isIncome ? 'text-green-600' : 'text-destructive'}`}
          >
            {isIncome ? '+' : '-'}{percentage}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-2xl font-bold">
          {isIncome
            ? formatCurrency(totalIncome)
            : formatCurrency(totalExpense)}
        </p>
        <Progress
          value={percentage}
          indicatorClassName={isIncome ? 'bg-green-800' : 'bg-destructive'}
        />
      </CardContent>
    </Card>
  );
}
