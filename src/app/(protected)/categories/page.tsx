import { getCategories } from '@/actions/categories/get-categories';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { WrapperCategories } from './_components/wrapper-categories';

export default async function CategoriesPage() {
  const { categories } = await getCategories();

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

      <WrapperCategories categories={categories} />
    </PageContainer>
  );
}
