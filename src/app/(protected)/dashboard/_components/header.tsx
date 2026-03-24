'use client';

import { Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

      <Button>
        <Calendar /> Março 2026
      </Button>
    </header>
  );
}
