'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Installment } from '@/types/transactions/installment';

import { UpdateTransactionForm } from './update-transaction-form';

interface UpdateTransactionButtonProps {
  installment: Installment;
}

export function UpdateTransactionButton({
  installment,
}: UpdateTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
          Editar
        </Button>
      </DialogTrigger>

      <UpdateTransactionForm
        installment={installment}
        onClose={handleOnClose}
      />
    </Dialog>
  );
}
