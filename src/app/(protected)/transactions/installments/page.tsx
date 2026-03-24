import { FileText } from 'lucide-react';
import Link from 'next/link';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

      <PageContainer>
        <header className="flex items-end justify-between">
          <Headline>
            <HeadlineTitle>Novo Lançamento</HeadlineTitle>
            <HeadlineDescription>
              Registre uma transação financeira detalhadamente.
            </HeadlineDescription>
          </Headline>
        </header>

        <Card className="gap-0 p-0">
          <CardHeader className="border-b p-6">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <FileText className="text-primary" />
              Detalhes Gerais
            </CardTitle>
          </CardHeader>
          <CardDescription className="p-8">
            <CreateTransactionForm />
          </CardDescription>
        </Card>
      </PageContainer>
    </>
  );
}
