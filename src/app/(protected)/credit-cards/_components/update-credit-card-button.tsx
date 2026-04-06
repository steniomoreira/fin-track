'use client';

import { Pencil } from 'lucide-react';
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

import { UpsertCreditCardForm } from './upsert-credit-card/upsert-credit-card-form';

interface UpdateCreditCardButtonProps {
  creditCard: CreditCard;
}

export function UpdateCreditCardButton({
  creditCard,
}: UpdateCreditCardButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar cartão</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para atualizar o cartão de crédito{' '}
            <span className="font-semibold">{creditCard.name}</span>.
          </DialogDescription>
        </DialogHeader>

        <UpsertCreditCardForm
          creditCard={creditCard}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
