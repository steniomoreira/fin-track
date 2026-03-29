'use client';

import { SelectMonthByDate } from '@/components/select-month-by-date';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { useAppSession } from '@/contexts/session-context';

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

      <SelectMonthByDate date={new Date()} />
    </header>
  );
}
