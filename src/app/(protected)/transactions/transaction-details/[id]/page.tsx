import { Pencil, RefreshCcwDot } from 'lucide-react';

import { getInstallmentTransactionById } from '@/actions/transactions/get-installmet-transaction-by-id';
import { Button } from '@/components/ui/button';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { BackButton } from './_components/back-button';
import { TransactionDetailsBreadcrumbs } from './_components/transaction-details-breadcrumbs';

interface TransactionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailsPage({
  params,
}: TransactionDetailsPageProps) {
  const { id } = await params;
  const { installment } = await getInstallmentTransactionById(id);

  return (
    <PageContainer>
      <TransactionDetailsBreadcrumbs />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />

          <Headline>
            <HeadlineTitle className="capitalize">
              {installment?.transaction?.description}
            </HeadlineTitle>
            <HeadlineDescription>ID: {installment?.id}</HeadlineDescription>
          </Headline>
        </div>

        <div className="space-x-4">
          <Button variant="outline">
            <Pencil />
            Editar
          </Button>
          <Button variant="destructive">
            <RefreshCcwDot />
            Estornar
          </Button>
        </div>
      </header>
    </PageContainer>
  );
}
