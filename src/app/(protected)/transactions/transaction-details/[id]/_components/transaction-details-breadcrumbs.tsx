'use client';

import { useRouter } from 'next/navigation';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';

export function TransactionDetailsBreadcrumbs() {
  const router = useRouter();

  const breadcrumbs = [
    {
      key: 'transactions',
      content: (
        <Button
          variant="link"
          className="text-foreground p-0 no-underline hover:cursor-pointer hover:no-underline"
          onClick={() => router.back()}
        >
          Transações
        </Button>
      ),
    },
    {
      key: 'transaction-details',
      content: 'Detalhes da transação',
      active: true,
    },
  ];

  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
}
