import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

export default async function CategoriesPage() {
  return (
    <PageContainer>
      <header className="flex items-end justify-between">
        <Headline>
          <HeadlineTitle>Gerenciamento de categorias</HeadlineTitle>
          <HeadlineDescription>
            Organize suas contas com grupos e categorias personalizadas.
          </HeadlineDescription>
        </Headline>
      </header>

      <div className="flex flex-wrap items-center gap-6">content</div>
    </PageContainer>
  );
}
