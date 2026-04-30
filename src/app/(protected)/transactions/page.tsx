import { getInvoices } from '@/actions/invoices/get-invoices';
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
import { mergeInstallmentsAndInvoices } from './utils/merge-installments-invoices';

type Params = {
  month: Date;
};

interface TransactionsPageProps {
  searchParams: Promise<Params>;
}

export default async function TransactionsPage({
  searchParams,
}: TransactionsPageProps) {
  const { month } = await searchParams;

  const { installments } = await getInstallmentsTransactions(month);
  const { invoices } = await getInvoices(month);

  const tableData = mergeInstallmentsAndInvoices(installments, invoices);

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

      <DataTable columns={columns} data={tableData} />
    </PageContainer>
  );
}
