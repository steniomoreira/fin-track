import { getInvoicesBySlug } from '@/actions/invoices/get-invoices-by-slug';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

interface InvoicePageProps {
  params: Promise<{ invoiceSlug: string }>;
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { invoiceSlug } = await params;

  const { invoice } = await getInvoicesBySlug(invoiceSlug);

  return (
    <PageContainer>
      <header>
        <Headline>
          <HeadlineTitle>{`Fatura ${invoice?.creditCard.name}`}</HeadlineTitle>
          <HeadlineDescription>
            Detalhes da fatura do cartão de crédito.
          </HeadlineDescription>
        </Headline>
      </header>

      <div className="m-auto grid w-full max-w-[1600px] grid-cols-[320px_1fr] gap-6">
        <div>Cartão</div>
        <div>Fatura</div>
      </div>
    </PageContainer>
  );
}
