import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { SelectMonthByDate } from '@/components/select-month-by-date';
import { DataTable } from '@/components/table/data-table';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { getMonthByDate } from '@/utils/date-utils';

import { AddTransactionButton } from './_components/add-transaction-button';
import { columns } from './constants/columns';

type Params = {
  month: Date;
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const { month } = await searchParams;

  const { installments } = await getInstallmentsTransactions(month);

  const { firstDay: date } = getMonthByDate(month);

  return (
    <PageContainer>
      <header className="flex items-end justify-between">
        <Headline>
          <HeadlineTitle>Transações</HeadlineTitle>
          <HeadlineDescription>
            Gerencie e acompanhe suas atividades financeiras em todas as suas
            contas.
          </HeadlineDescription>
        </Headline>

        <AddTransactionButton />
      </header>

      <SelectMonthByDate date={date} variant="outline" />

      <DataTable columns={columns} data={installments} />
    </PageContainer>
  );
}
