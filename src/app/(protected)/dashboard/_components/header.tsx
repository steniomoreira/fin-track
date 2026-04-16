'use client';

import { SelectMonthByDate } from '@/components/select-month-by-date';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { useAppSession } from '@/contexts/session-context';
import { getMonthByDate } from '@/utils/date-utils';

interface HeaderProps {
  month: Date;
}

export function Header({ month }: HeaderProps) {
  const { user } = useAppSession();

  const { firstDay: date } = getMonthByDate(month);

  return (
    <header className="flex items-end justify-between">
      <Headline>
        <HeadlineTitle className="capitalize">Olá, {user.name}!</HeadlineTitle>
        <HeadlineDescription>
          Veja o que está acontecendo com suas finances hoje.
        </HeadlineDescription>
      </Headline>

      <SelectMonthByDate date={date} />
    </header>
  );
}
