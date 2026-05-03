import { getInvoices } from '@/actions/invoices/get-invoices';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { INVOICE_MONTHS_BEFORE } from '@/constants/invoices-constants';
import { isEmptyArray } from '@/utils/array-utils';
import { formatDateToMonthYear } from '@/utils/date-utils';

import { CreditCard } from '../_components/credit-card';
import { EmptyContainer } from './components/empty-container';
import { InvoiceNavigation } from './components/envoice-navigation';

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

  if (isEmptyArray(invoices)) return <EmptyContainer />;

  const invoice = invoices[0];

  const invoiceItems = invoices.filter(
    (invoice) => formatDateToMonthYear(invoice.dueDate) === invoiceRef
  );

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
          />
        </div>
        <div className="flex flex-col gap-4">
          <InvoiceNavigation invoices={invoices} invoiceRef={invoiceRef} />

          <div>
            {invoiceItems.map((invoice) => (
              <div key={invoice.id}>
                {invoice.installments.map((installment) => (
                  <div key={installment.id}>
                    {installment.transaction.description} - {installment.amount}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
