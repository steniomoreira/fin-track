'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Category } from '@/types/categories/category';
import { Invoice } from '@/types/invoices/invoice';

import { AddTransactionForm } from './add-transaction-form';

interface AddTransactionButtonProps {
  invoice: Invoice;
  categories: Category[];
}

export function AddTransactionButton({
  invoice,
  categories,
}: AddTransactionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOnClose() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <AddTransactionForm
          invoice={invoice}
          categories={categories}
          onClose={handleOnClose}
        />
      </DialogContent>
    </Dialog>
  );
}
