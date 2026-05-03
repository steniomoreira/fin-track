import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

export function EmptyContainer() {
  return (
    <PageContainer>
      <header>
        <Headline>
          <HeadlineTitle>{'Nenhuma fatura encontrada'}</HeadlineTitle>
          <HeadlineDescription>
            Nenhuma fatura encontrada para o cartão selecionado.
          </HeadlineDescription>
        </Headline>
      </header>
    </PageContainer>
  );
}
