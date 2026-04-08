import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { UpsertCategoriesForm } from './_components/upsert-categories/upsert-categories-form';

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

      <div className="grid grid-cols-[1fr_350px] gap-6">
        <div>list categories</div>
        <div>
          <UpsertCategoriesForm />
        </div>
      </div>
    </PageContainer>
  );
}
