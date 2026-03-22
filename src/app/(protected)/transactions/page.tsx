import { DataTable } from '@/components/table/data-table';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { AddTransactionButton } from '../_components/add-transaction-button';
import { columns } from './constants/columns';
import { transactions } from './data';

export default function TransactionsPage() {
  const data = transactions;

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

      <DataTable columns={columns} data={data} />
    </PageContainer>
  );
}
