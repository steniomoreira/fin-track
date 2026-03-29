import { getInstallmentsTransactions } from '@/actions/transactions/get-installments-transactions';
import { SelectMonthByDate } from '@/components/select-month-by-date';
import { DataTable } from '@/components/table/data-table';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { AddTransactionButton } from './_components/add-transaction-button';
import { columns } from './constants/columns';

export default async function TransactionsPage() {
  const { installments } = await getInstallmentsTransactions();

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

      <SelectMonthByDate date={new Date()} variant="outline" />

      <DataTable columns={columns} data={installments} />
    </PageContainer>
  );
}
