'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { UpsertCreditCardForm } from './upsert-credit-card/upsert-credit-card-form';

export function AddCreditCardButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="border-muted-foreground/30 hover:border-muted-foreground/50 flex h-[180px] w-[300px] cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed p-6 transition-colors">
          <Plus className="text-muted-foreground h-10 w-10" />
          <span className="text-muted-foreground">Adicionar novo cartão</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[350px]">
        <DialogHeader>
          <DialogTitle>Adicionar novo cartão</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar um novo cartão de crédito.
          </DialogDescription>
        </DialogHeader>

        <UpsertCreditCardForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
