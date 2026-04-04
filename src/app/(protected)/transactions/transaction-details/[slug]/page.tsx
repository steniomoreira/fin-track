import { Pencil, RefreshCcwDot } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getInstallmentTransactionBySlug } from '@/actions/transactions/get-installmet-transaction-by-slug';
import { Button } from '@/components/ui/button';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { BackButton } from './_components/back-button';
import { PaymentHistoryTransactions } from './_components/payment-history-transactions';
import { TransactionDetailsBreadcrumbs } from './_components/transaction-details-breadcrumbs';
import { TransactionsDetails } from './_components/transactions-details';

interface TransactionDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TransactionDetailsPage({
  params,
}: TransactionDetailsPageProps) {
  const { slug } = await params;
  const { installment } = await getInstallmentTransactionBySlug(slug);

  if (!installment) {
    notFound();
  }

  return (
    <PageContainer>
      <TransactionDetailsBreadcrumbs />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />

          <Headline>
            <HeadlineTitle className="capitalize">
              {installment.transaction?.description}
            </HeadlineTitle>
            <HeadlineDescription>
              ID: {installment.hashCode}
            </HeadlineDescription>
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

      <TransactionsDetails installment={installment} />

      {installment.payments.length > 0 && (
        <PaymentHistoryTransactions installment={installment} />
      )}
    </PageContainer>
  );
}
