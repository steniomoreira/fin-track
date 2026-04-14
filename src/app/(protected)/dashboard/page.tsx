import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import { Progress } from '@/components/ui/progress';
import { EXPENSE, INCOME } from '@/constants/transactions-contants';

import { Header } from './_components/header';
import { RecentTransactions } from './_components/recent-transactions';
import { Summary } from './_components/summary';
import { SummaryCard } from './_components/summary-card';

type Params = {
  month: Date;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { month } = await searchParams;

  const { installments } = await getInstallmentsTransactions(month);

  return (
    <PageContainer>
      <Header />

      <Summary installments={installments} />

      <div className="grid grid-cols-[300px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <SummaryCard installments={installments} type={INCOME} />
          <SummaryCard installments={installments} type={EXPENSE} />

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground relative flex items-center gap-4 text-sm">
                Balanço por Categorias
                <span className="absolute right-0 text-xs">Top 5</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Moradia</p>
                  <p className="text-sm">R$ 120,00</p>
                </div>
                <Progress value={12} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Moradia</p>
                  <p className="text-sm">R$ 130,00</p>
                </div>
                <Progress value={15} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Alimentação</p>
                  <p className="text-sm">R$ 120,00</p>
                </div>
                <Progress value={12} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Transporte</p>
                  <p className="text-sm">R$ 50,00</p>
                </div>
                <Progress value={30} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-sm">Moradia</p>
                  <p className="text-sm">R$ 120,00</p>
                </div>
                <Progress value={12} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <RecentTransactions installments={installments} month={month} />
        </div>
      </div>
    </PageContainer>
  );
}
