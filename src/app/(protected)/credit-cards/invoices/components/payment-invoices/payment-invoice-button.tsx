'use client';

import { BanknoteArrowUp } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { Invoice } from '@/types/invoices/invoice';

import { PaymentInvoiceForm } from './payment-invoice-form';

interface PaymentInvoiceButtonProps {
  invoice: Invoice;
}

export function PaymentInvoiceButton({ invoice }: PaymentInvoiceButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  const isPaid = invoice.status === status.PAID;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={isPaid}>
          <BanknoteArrowUp /> Pagar fatura
        </Button>
      </DialogTrigger>

      <DialogContent>
        <PaymentInvoiceForm invoice={invoice} onClose={handleOnClose} />
      </DialogContent>
    </Dialog>
  );
}
