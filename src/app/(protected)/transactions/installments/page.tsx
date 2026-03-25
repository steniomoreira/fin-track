import Link from 'next/link';

import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { HeaderContainer, PageContainer } from '@/components/ui/page-container';

import { CreateTransactionForm } from '../_components/create-transaction-form';

export default function InstallmentsPage() {
  return (
    <>
      <HeaderContainer>
        <ul className="flex items-center gap-2 text-sm">
          <li className="opacity-50">
            <Link href={'/transactions'}>Transaçãoes</Link>
          </li>
          <li className="opacity-50">&#62;</li>
          <li>Novo Lançamento</li>
        </ul>
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
