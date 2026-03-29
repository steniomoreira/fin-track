'use client';

import { BanknoteArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { InstallmentTransaction } from '@/types/installment-transaction-types';

import { PaymentTransactionForm } from './payment-transaction-form';

interface PaymentInstallmentsButtonProps {
  installment: InstallmentTransaction;
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

      <PaymentTransactionForm
        installment={installment}
        onClose={handleOnClose}
      />
    </Dialog>
  );
}
