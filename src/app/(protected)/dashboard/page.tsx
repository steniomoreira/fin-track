import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/headline';
import { requireSession } from '@/utils/session';

import SignOutButton from './_components/sign-out-button';

async function DashboardPage() {
  const { user } = await requireSession();

  return (
    <div>
      <Headline>
        <HeadlineTitle className="capitalize">Olá, {user.name}!</HeadlineTitle>
        <HeadlineDescription>
          Veja o que está acontecendo com suas finances hoje.
        </HeadlineDescription>
      </Headline>

      <SignOutButton />
    </div>
  );
}

export default DashboardPage;
