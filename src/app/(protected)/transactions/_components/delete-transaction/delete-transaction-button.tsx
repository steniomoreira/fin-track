'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

import { DeleteTransaction } from './delete-transaction';

interface DeleteInstallmentsButtonProps {
  installment: Installment;
}

export function DeleteTransactionButton({
  installment,
}: DeleteInstallmentsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  const isPaid = installment.status === status.PAID;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isPaid}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DeleteTransaction installment={installment} onClose={handleOnClose} />
    </Dialog>
  );
}
