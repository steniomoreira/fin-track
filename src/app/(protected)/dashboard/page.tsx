import { getInvoices } from '@/actions/invoices/get-invoices';
import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { PageContainer } from '@/components/ui/page-container';
import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { isEmptyArray } from '@/utils/array-utils';

import { mergeInstallmentsAndInvoices } from '../transactions/utils/merge-installments-invoices';
import { Header } from './_components/header';
import { NoResultTransactions } from './_components/no-result-transactions';
import { RecentTransactions } from './_components/recent-transactions';
import { Summary } from './_components/summary';
import { SummaryCard } from './_components/summary-card';
import { SummaryCategories } from './_components/summary-categories';
import { SummaryCreditCards } from './_components/summary-credit-cards';

type Params = {
  month: Date;
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const { month } = await searchParams;

  const { installments } = await getInstallmentsTransactions(month);
  const { invoices } = await getInvoices({ date: month });

  const data = mergeInstallmentsAndInvoices(installments, invoices);

  return (
    <PageContainer>
      <Header month={month} />

      {isEmptyArray(data) ? (
        <NoResultTransactions />
      ) : (
        <>
          <Summary installments={data} />

          <div className="grid grid-cols-[300px_1fr] gap-6">
            <div className="flex flex-col gap-6">
              <SummaryCard installments={data} type={INCOME} />
              <SummaryCard installments={data} type={EXPENSE} />
              <SummaryCreditCards installments={data} />
              <SummaryCategories installments={data} />
            </div>
            <div>
              <RecentTransactions installments={data} month={month} />
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
