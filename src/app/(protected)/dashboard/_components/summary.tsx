import { PiggyBank, TrendingUp } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';

import { useDashboard } from '../_hooks/use-dashboard';

interface SummaryProps {
  installments: Installment[];
}

export function Summary({ installments }: SummaryProps) {
  const { totalBalance } = useDashboard(installments);

  console.log(totalBalance);

  return (
    <Card className="bg-primary">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-sm">Saldo atual</h2>
          <p className="text-4xl font-bold text-white">
            {formatCurrency(totalBalance)}
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-muted/20 flex items-center gap-2 rounded-md p-1 text-green-500">
              <TrendingUp className="h-5 w-5" />
              +10%
            </span>
            <p className="text-sm">em relação ao mês anterior</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Card className="flex h-32 w-32 flex-col items-center justify-center gap-1 bg-white/10">
            <PiggyBank className="h-8 w-8" />
            <p className="text-xs">Economias</p>
            <p className="text-base font-bold">R$ 10.9K</p>
          </Card>
          <Card className="flex h-32 w-32 flex-col items-center justify-center gap-1 bg-white/10">
            <TrendingUp className="h-8 w-8" />
            <p className="text-xs">Investimentos</p>
            <p className="text-base font-bold">R$ 50K</p>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
