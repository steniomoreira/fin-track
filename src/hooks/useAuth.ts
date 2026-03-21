'use client';

import { useRouter } from 'next/navigation';

import { signOut } from '@/lib/auth-client';

export function useAuth() {
  const route = useRouter();

  const logout = () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          route.push('/sign-in');
        },
      },
    });
  };

  return { logout };
}
