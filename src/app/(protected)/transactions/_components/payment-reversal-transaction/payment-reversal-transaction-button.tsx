'use client';

import { RefreshCcwDot } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';

import { TablePaymentHistoryTransaction } from './table-payment-history-transaction';

interface PaymentReversalTransactionButtonProps {
  installment: Installment;
}

export function PaymentReversalTransactionButton({
  installment,
}: PaymentReversalTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  const hasPaid =
    installment.status === status.PAID || installment.status === status.PARTIAL;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={!hasPaid}>
          <RefreshCcwDot />
          Estornar
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-162.5 px-0">
        <DialogHeader className="px-6">
          <DialogTitle>Estornar pagamentos</DialogTitle>
          <DialogDescription>
            Clique no botão Estornar ao lado do registro que deseja reverter o
            pagamento
          </DialogDescription>
        </DialogHeader>

        <TablePaymentHistoryTransaction
          installment={installment}
          onClose={handleOnClose}
        />
      </DialogContent>
    </Dialog>
  );
}
