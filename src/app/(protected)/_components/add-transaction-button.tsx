import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function AddTransactionButton() {
  return (
    <Button>
      <Plus />
      Adicionar Transação
    </Button>
  );
}
