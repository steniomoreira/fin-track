'use client';

import { createContext, useContext } from 'react';

import type { Session } from '@/lib/auth';

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useAppSession(): Session {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error(
      'useAppSession must be used within the AppLayout (group (app))'
    );
  }
  return session;
}
