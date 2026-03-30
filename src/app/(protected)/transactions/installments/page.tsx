import Link from 'next/link';

import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { HeaderContainer, PageContainer } from '@/components/ui/page-container';

import { CreateTransactionForm } from '../_components/create-transactions-form';
import { InstallmentsTransactionBreadcrumbs } from '../_components/installments-transaction-breadcrumbs';

export default function InstallmentsPage() {
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

          <CreateTransactionForm />
        </div>
      </PageContainer>
    </>
  );
}
