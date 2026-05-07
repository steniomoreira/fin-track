import { getInvoices } from '@/actions/invoices/get-invoices';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { INVOICE_MONTHS_BEFORE } from '@/constants/invoices-constants';
import { invoiceStatus } from '@/constants/invoices-constants';
import { formatDateToMonthYear } from '@/utils/date-utils';

import { CreditCard } from '../_components/credit-card';
import { EmptyContainer } from './components/empty-container';
import { InvoiceNavigation } from './components/envoice-navigation';
import { InvoiceTransactions } from './components/invoices-transactions';

interface InvoicesPageProps {
  searchParams: Promise<{
    card: string;
    ref: string;
  }>;
}

export default async function InvoicesPage({
  searchParams,
}: InvoicesPageProps) {
  const { card, ref: invoiceRef } = await searchParams;

  const { invoices } = await getInvoices({
    creditCardName: card,
    date: invoiceRef,
    monthsBefore: INVOICE_MONTHS_BEFORE,
    includeFuture: true,
  });

  const invoiceOpenOrLatest =
    invoices.find((invoice) => invoice.status === invoiceStatus.OPEN) ||
    invoices.at(-1);

  const invoice =
    invoices.find(
      (invoice) => formatDateToMonthYear(invoice.dueDate) === invoiceRef
    ) || invoiceOpenOrLatest;

  if (!invoice || !invoiceOpenOrLatest) return <EmptyContainer />;

  return (
    <PageContainer>
      <header>
        <Headline>
          <HeadlineTitle>{`Fatura ${invoice.creditCard.name}`}</HeadlineTitle>
          <HeadlineDescription>
            Detalhes da fatura do cartão de crédito.
          </HeadlineDescription>
        </Headline>
      </header>

      <div className="m-auto grid w-full max-w-[1600px] grid-cols-[320px_1fr] gap-6">
        <div>
          <CreditCard
            key={invoice.creditCard.id}
            creditCard={invoice.creditCard}
            totalInvoiceValue={invoice.totalAmount}
          />
        </div>
        <div className="flex flex-col gap-4">
          <InvoiceNavigation
            invoices={invoices}
            invoiceRef={
              invoiceRef || formatDateToMonthYear(invoiceOpenOrLatest.dueDate)
            }
          />

          <div>
            <InvoiceTransactions invoice={invoice} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
