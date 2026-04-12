import { getCategories } from '@/actions/categories/get-categories';
import { getCreditCards } from '@/actions/credit-cards/get-credit-cards';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { HeaderContainer, PageContainer } from '@/components/ui/page-container';

import { CreateTransaction } from '../_components/create-transactions';
import { InstallmentsTransactionBreadcrumbs } from '../_components/installments-transaction-breadcrumbs';

export default async function InstallmentsPage() {
  const { creditCards } = await getCreditCards();
  const { categories } = await getCategories();

  return (
    <>
      <HeaderContainer>
        <InstallmentsTransactionBreadcrumbs />
      </HeaderContainer>

      <PageContainer className="mt-16 flex flex-col items-center">
        <div className="w-full max-w-207.5 space-y-8">
          <header>
            <Headline>
              <HeadlineTitle>Novo Lançamento</HeadlineTitle>
              <HeadlineDescription>
                Registre uma transação financeira detalhadamente.
              </HeadlineDescription>
            </Headline>
          </header>

          <CreateTransaction
            creditCards={creditCards}
            categories={categories}
          />
        </div>
      </PageContainer>
    </>
  );
}
