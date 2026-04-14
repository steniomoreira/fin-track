import { CreditCard, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageContainer } from '@/components/ui/page-container';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';
import { EXPENSE, status } from '@/constants/transactions-contants';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';

import { BadgeStatusTransactions } from '../_components/badge-status-transactions';
import { getTotalPaid } from '../transactions/utils/payments-utils';
import { Header } from './_components/header';
import { RecentTransactions } from './_components/recent-transactions';

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

      <Card className="bg-primary">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-sm">Saldo atual</h2>
            <p className="text-4xl font-bold text-white">R$ 50.999,00</p>
            <div className="flex items-center gap-2">
              <span className="bg-muted/20 flex items-center gap-2 rounded-md p-1 text-green-500">
                <TrendingUp className="h-5 w-5" />
                +10%
              </span>
              <p className="text-sm">em relação ao mês passado</p>
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

      <div className="grid grid-cols-[300px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground flex items-center gap-4 text-sm">
                <span
                  className={`inline-block rounded-md bg-green-600/20 p-1 text-green-600`}
                >
                  <TrendingUp className="h-6 w-6" />
                </span>
                Total de Receitas
                <span className="flex-1 text-right text-sm text-green-600">
                  +45%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">R$ 50.999,00</p>
              <Progress
                value={45}
                id="income"
                indicatorClassName="bg-green-800"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-muted-foreground flex items-center gap-4 text-sm">
                <span
                  className={`bg-destructive/20 text-destructive inline-block rounded-md p-1`}
                >
                  <TrendingDown className="h-6 w-6" />
                </span>
                Total de Despesas
                <span className="text-destructive flex-1 text-right text-sm">
                  +55%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-2xl font-bold">R$ 50.999,00</p>
              <Progress
                value={45}
                id="expense"
                indicatorClassName="bg-destructive"
              />
            </CardContent>
          </Card>

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
