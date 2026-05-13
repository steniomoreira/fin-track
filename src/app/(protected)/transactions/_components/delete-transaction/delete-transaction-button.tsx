'use client';

import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
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
        <Button
          variant="ghost"
          size="icon"
          disabled={isPaid}
          className="hover:text-destructive"
        >
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DeleteTransaction installment={installment} onClose={handleOnClose} />
      </DialogContent>
    </Dialog>
  );
}
