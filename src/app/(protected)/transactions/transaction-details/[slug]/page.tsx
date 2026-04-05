import { notFound } from 'next/navigation';

import { getInstallmentTransactionBySlug } from '@/actions/transactions/get-installmet-transaction-by-slug';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { PaymentReversalTransactionButton } from '../../_components/payment-reversal-transaction/payment-reversal-transaction-button';
import { UpdateTransactionButton } from '../../_components/update-transaction/update-transaction-button';
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

  const hasPayment = installment.payments.length > 0;

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
          <UpdateTransactionButton installment={installment} />
          <PaymentReversalTransactionButton installment={installment} />
        </div>
      </header>

      <TransactionsDetails installment={installment} />

      {hasPayment && <PaymentHistoryTransactions installment={installment} />}
    </PageContainer>
  );
}
