'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function BackButton() {
  const router = useRouter();

  const routerBack = () => {
    router.back();
  };

  return (
    <Button variant="outline" size="icon" className="mr-2" onClick={routerBack}>
      <ArrowLeft />
    </Button>
  );
}
