'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard } from '@/types/credit-cards/credit-card';
import { Installment } from '@/types/transactions/installment';

import { UpdateTransactionForm } from './update-transaction-form';

interface UpdateTransactionButtonProps {
  installment: Installment;
  creditCards: CreditCard[];
}

export function UpdateTransactionButton({
  installment,
  creditCards,
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
      <DialogContent>
        <UpdateTransactionForm
          installment={installment}
          creditCards={creditCards}
          onClose={handleOnClose}
        />
      </DialogContent>
    </Dialog>
  );
}
