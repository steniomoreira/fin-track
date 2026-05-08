import { RefreshCcwDot } from 'lucide-react';

import { getInvoices } from '@/actions/invoices/get-invoices';
import { Button } from '@/components/ui/button';
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
import { PaymentInvoiceButton } from './components/payment-invoices/payment-invoice-button';

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

  const isPaid =
    invoice.status === invoiceStatus.PAID ||
    invoice.status === invoiceStatus.PARTIAL;

  return (
    <PageContainer>
      <header className="flex items-end justify-between">
        <Headline>
          <HeadlineTitle>{`Fatura ${invoice.creditCard.name}`}</HeadlineTitle>
          <HeadlineDescription>
            Detalhes da fatura do cartão de crédito.
          </HeadlineDescription>
        </Headline>

        <div className="flex items-center gap-4">
          <PaymentInvoiceButton invoice={invoice} />

          <Button variant="destructive" disabled={!isPaid}>
            <RefreshCcwDot />
            Estornar
          </Button>
        </div>
      </header>

      <div className="m-auto grid w-full max-w-[1600px] grid-cols-[320px_1fr] gap-6">
        <div>
          <CreditCard
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
