'use client';

import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { useAppSession } from '@/contexts/session-context';

import { AddTransactionButton } from '../../_components/add-transaction-button';

export function Header() {
  const { user } = useAppSession();

  return (
    <header className="flex items-end justify-between">
      <Headline>
        <HeadlineTitle className="capitalize">Olá, {user.name}!</HeadlineTitle>
        <HeadlineDescription>
          Veja o que está acontecendo com suas finances hoje.
        </HeadlineDescription>
      </Headline>

      <AddTransactionButton />
    </header>
  );
}
