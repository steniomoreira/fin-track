'use client';

import { Trash2 } from 'lucide-react';
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
import { CreditCard } from '@/types/credit-cards/credit-card';

import { DeleteCreditCard } from './delete-credit-card';

interface DeleteCreditCardButtonProps {
  creditCard: CreditCard;
}

export function DeleteCreditCardButton({
  creditCard,
}: DeleteCreditCardButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Deletar cartão de crédito</DialogTitle>
          <DialogDescription>
            Esta ação apagará permanentemente o cartão de crédito{' '}
            <span className="font-semibold">{creditCard.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <DeleteCreditCard
          creditCard={creditCard}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
