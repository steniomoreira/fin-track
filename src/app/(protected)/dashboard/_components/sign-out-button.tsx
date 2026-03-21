'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

function SignOutButton() {
  const { logout } = useAuth();

  return <Button onClick={logout}>Sair</Button>;
}

export default SignOutButton;
