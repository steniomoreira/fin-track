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

  console.log(invoiceSlug);

  return (
    <PageContainer>
      <header>
        <Headline>
          <HeadlineTitle>Fatura do cartão</HeadlineTitle>
          <HeadlineDescription>
            Detalhes da fatura do cartão de crédito.
          </HeadlineDescription>
        </Headline>
      </header>
    </PageContainer>
  );
}
