import { headers } from 'next/headers';

import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/headline';
import { auth } from '@/lib/auth';

import SignOutButton from './_components/sign-out-button';

async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <Headline>
        <HeadlineTitle>Olá, {session?.user?.name}!</HeadlineTitle>
        <HeadlineDescription>
          Veja o que está acontecendo com suas finances hoje.
        </HeadlineDescription>
      </Headline>

      <SignOutButton />
    </div>
  );
}

export default DashboardPage;
