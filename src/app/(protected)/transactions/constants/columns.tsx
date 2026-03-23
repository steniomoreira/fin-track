'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BanknoteArrowUp, Home, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Transaction = {
  id: string;
  data: string;
  description: string;
  category: string;
  creditCard?: string;
  status: 'LATE' | 'PAID' | 'PARTIAL' | 'PENDING';
  amount: number;
  type: 'INCOME' | 'EXPENSE';
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'data',
    header: 'Data',
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      return (
        <div className="text-foreground flex items-center gap-2">
          <span className="text-primary bg-muted rounded-full p-2">
            <Home className="h-4 w-4" />
          </span>
          {row.getValue('description')}
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      return (
        <Badge className="bg-muted text-muted-foreground">
          {row.getValue('category')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'creditCard',
    header: 'Cartão de crédito',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('status') === 'PAID') {
        return <Badge className="bg-green-100 text-green-600">Pago</Badge>;
      }

      return <Badge className="bg-amber-100 text-amber-600">Pendente</Badge>;
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const isExpense = row.original.type === 'EXPENSE';

      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount / 100);

      return (
        <div
          className={`${isExpense ? 'text-red-500' : 'text-foreground'} text-right font-medium`}
        >
          {isExpense && `-`}
          {formatted}
        </div>
      );
    },
  },
  {
    id: 'actions',
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
