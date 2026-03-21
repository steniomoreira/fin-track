import { SessionProvider } from '@/contexts/session-context';
import { requireSession } from '@/lib/session';

import SignOutButton from './dashboard/_components/sign-out-button';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <SessionProvider session={session}>
      <div className="grid h-screen grid-cols-[300px_1fr] gap-4">
        <aside className="h-screen border-r-2 p-4">
          Sidebar <SignOutButton />
        </aside>
        <main className="p-4">{children}</main>
      </div>
    </SessionProvider>
  );
}
