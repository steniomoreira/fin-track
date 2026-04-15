import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { PageContainer } from '@/components/ui/page-container';
import { EXPENSE, INCOME } from '@/constants/transactions-contants';

import { Header } from './_components/header';
import { RecentTransactions } from './_components/recent-transactions';
import { Summary } from './_components/summary';
import { SummaryCard } from './_components/summary-card';
import { SummaryCategories } from './_components/summary-categories';

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
          <SummaryCategories installments={installments} />
        </div>

        <div>
          <RecentTransactions installments={installments} month={month} />
        </div>
      </div>
    </PageContainer>
  );
}
