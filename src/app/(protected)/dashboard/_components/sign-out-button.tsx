'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/auth-client';

function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() =>
        signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/sign-in');
            },
          },
        })
      }
    >
      Sair
    </Button>
  );
}

export default SignOutButton;
