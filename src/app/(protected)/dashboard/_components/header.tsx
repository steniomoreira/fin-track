'use client';

import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { useAppSession } from '@/contexts/session-context';

export function Header() {
  const { user } = useAppSession();

  return (
    <Headline>
      <HeadlineTitle className="capitalize">Olá, {user.name}!</HeadlineTitle>
      <HeadlineDescription>
        Veja o que está acontecendo com suas finances hoje.
      </HeadlineDescription>
    </Headline>
  );
}
