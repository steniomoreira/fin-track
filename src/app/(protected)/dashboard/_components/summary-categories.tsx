// SummaryCategories.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Installment } from '@/types/transactions/installment';
import { isEmptyArray } from '@/utils/array-utils';
import { formatCurrency } from '@/utils/currency-utils';

import { useSummaryCategories } from '../_hooks/use-summary-categories';

interface SummaryCategoriesProps {
  installments: Installment[];
}

export function SummaryCategories({ installments }: SummaryCategoriesProps) {
  const { topFiveCategories } = useSummaryCategories(installments);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground relative flex items-center gap-4 text-sm">
          Despesas por Categorias
          <span className="absolute right-0 text-xs">Top 5</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEmptyArray(topFiveCategories) ? (
          <p className="text-muted-foreground text-sm">
            Nenhuma despesa registrada.
          </p>
        ) : (
          topFiveCategories.map((category) => (
            <div key={category.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  {category.name}{' '}
                  <span className="text-xs text-neutral-50">
                    {category.percentage}%
                  </span>
                </p>
                <p className="text-sm">{formatCurrency(category.amount)}</p>
              </div>
              <Progress
                value={category.percentage}
                indicatorClassName="bg-destructive"
              />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
