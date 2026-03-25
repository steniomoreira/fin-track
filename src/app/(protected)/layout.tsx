import { SidebarProvider } from '@/components/ui/sidebar';
import { SessionProvider } from '@/contexts/session-context';
import { requireSession } from '@/lib/session';

import { AppSidebar } from './_components/app-sidebar';

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireSession();

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <main className="relative w-full">{children}</main>
      </SidebarProvider>
    </SessionProvider>
  );
}
