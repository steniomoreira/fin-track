'use client';

import { ColumnDef } from '@tanstack/react-table';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';
import { EXPENSE, status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';

import { BadgeStatusTransactions } from '../../_components/badge-status-transactions';
import { DeleteTransactionButton } from '../_components/delete-transaction/delete-transaction-button';
import { PaymentTransactionButton } from '../_components/payment-transaction/payment-transaction-button';
import { getTotalPaid } from '../utils/payments-utils';

export const columns: ColumnDef<Installment>[] = [
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
      const category = installment.transaction.category;

      const Icon = ICON_MAP[category.icon];
      const { contentColor } = COLOR_MAP[category.color as ColorName];

      return (
        <div className="text-foreground flex items-center gap-2">
          <span className={`${contentColor} rounded-full p-2`}>
            <Icon className="h-4 w-4" />
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
        <Badge className="bg-muted text-muted-foreground capitalize">
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
        return (
          <span className="capitalize">
            {creditCard.name} ***** {creditCard.cardNumber.slice(-4)}
          </span>
        );
      }
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <BadgeStatusTransactions
        status={row.getValue('status')}
        dueDate={row.original.dueDate}
      />
    ),
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => {
      const installment = row.original;
      const isExpense = installment.transaction.type === EXPENSE;

      return (
        <div
          className={`flex flex-col ${isExpense ? 'text-destructive' : 'text-foreground'} text-right font-medium`}
        >
          {isExpense && `- `}

          {installment.status === status.PARTIAL ? (
            <>
              {formatCurrency(
                installment.amount - getTotalPaid(installment.payments)
              )}

              <span className="text-muted-foreground text-[10px]">
                Pago{' '}
                <span className="font-semibold">
                  {formatCurrency(getTotalPaid(installment.payments))}
                </span>
              </span>
            </>
          ) : (
            formatCurrency(row.getValue('amount'))
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const installment = row.original;

      return (
        <div className="text-center">
          <PaymentTransactionButton installment={installment} />

          <Button variant="ghost" size="icon" asChild>
            <Link
              href={`/transactions/transaction-details/${installment.slug}`}
            >
              <SquareArrowOutUpRight />
            </Link>
          </Button>

          <DeleteTransactionButton installment={installment} />
        </div>
      );
    },
  },
];
