import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

interface InvoicePageProps {
  params: { slug: string };
}

export default async function InvoicePage({ params }: InvoicePageProps) {
  const { slug } = params;

  console.log(slug);

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
