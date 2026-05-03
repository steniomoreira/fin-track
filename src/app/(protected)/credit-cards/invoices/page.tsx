import { getInvoices } from '@/actions/invoices/get-invoices';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

interface InvoicesPageProps {
  searchParams: Promise<{
    card?: string;
    ref?: string;
  }>;
}

export default async function InvoicesPage({
  searchParams,
}: InvoicesPageProps) {
  const { card, ref } = await searchParams;

  console.log(card, ref);

  const { invoices } = await getInvoices({
    creditCardName: card,
    date: ref,
  });

  return (
    <PageContainer>
      <header>
        <Headline>
          <HeadlineTitle>{`Fatura ${invoices?.[0]?.creditCard?.name ?? 'do cartão não encontrada'}`}</HeadlineTitle>
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
