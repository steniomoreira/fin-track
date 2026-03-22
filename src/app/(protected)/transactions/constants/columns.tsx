'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BanknoteArrowUp, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Transaction = {
  id: string;
  data: string;
  description: string;
  category: string;
  accountCard: string;
  status: 'late' | 'paid' | 'partial' | 'pending';
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'data',
    header: 'Data',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => (
      <div className="text-foreground">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
  },
  {
    accessorKey: 'accountCard',
    header: 'Conta/Cartão',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-left">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount);

      return (
        <div className="text-foreground text-left font-medium">{formatted}</div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const transactionId = row.original.id;
      return (
        <div className="text-center">
          <Button
            id={transactionId}
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary"
          >
            <BanknoteArrowUp />
          </Button>
          <Button id={transactionId} variant="ghost" size="icon">
            <Pencil />
          </Button>
          <Button id={transactionId} variant="ghost" size="icon">
            <Trash2 />
          </Button>
        </div>
      );
    },
  },
];
