'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BanknoteArrowUp, Home, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EXPENSE, status } from '@/constants/transactions-contants';
import { InstallmentTransaction } from '@/types/installment-transaction-types';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';

export const columns: ColumnDef<InstallmentTransaction>[] = [
  {
    accessorKey: 'dueDate',
    header: 'Data',
    cell: ({ row }) => date_dd_MMM_yyyy(row.getValue('dueDate')),
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
    cell: ({ row }) => {
      const installment = row.original;

      return (
        <div className="text-foreground flex items-center gap-2">
          <span className="text-primary bg-muted rounded-full p-2">
            <Home className="h-4 w-4" />
          </span>
          {installment.transaction.description}{' '}
          {installment.transaction.numberInstallments &&
            `(${installment.number}/${installment.transaction.numberInstallments})`}
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
          {row.original.transaction.category.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'creditCard',
    header: 'Cartão de crédito',
    cell: ({ row }) => {
      const creditCard = row.original.transaction.creditCard;

      if (creditCard) {
        return `${creditCard.name}*****${creditCard.cardNumber.slice(-4)}`;
      }
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      if (row.getValue('status') === status.PAID) {
        return <Badge className="bg-green-600/10 text-green-600">Pago</Badge>;
      }

      return (
        <Badge className="bg-yellow-600/10 text-yellow-600">Pendente</Badge>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const isExpense = row.original.transaction.type === EXPENSE;

      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('pt-Br', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount / 100);

      return (
        <div
          className={`${isExpense ? 'text-red-500' : 'text-foreground'} text-right font-medium`}
        >
          {isExpense && `- `}
          {formatted}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const transactionId = row.original.transactionId;

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
