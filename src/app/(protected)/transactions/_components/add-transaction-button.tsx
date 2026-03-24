import { Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function AddTransactionButton() {
  return (
    <Button asChild>
      <Link href={'/transactions/installments'}>
        <Plus />
        Adicionar Transação
      </Link>
    </Button>
  );
}
