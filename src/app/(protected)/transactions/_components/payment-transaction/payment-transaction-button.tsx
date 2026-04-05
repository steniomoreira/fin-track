'use client';

import { BanknoteArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

import { PaymentTransactionForm } from './payment-transaction-form';

interface PaymentInstallmentsButtonProps {
  installment: Installment;
}

export function PaymentTransactionButton({
  installment,
}: PaymentInstallmentsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  const isPaid = installment.status === status.PAID;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-primary hover:text-primary"
          variant={'ghost'}
          size="icon"
          disabled={isPaid}
        >
          <BanknoteArrowUp />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <PaymentTransactionForm
          installment={installment}
          onClose={handleOnClose}
        />
      </DialogContent>
    </Dialog>
  );
}
