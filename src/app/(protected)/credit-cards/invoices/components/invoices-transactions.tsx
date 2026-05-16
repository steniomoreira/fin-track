'use client';

import { useState } from 'react';

import { BadgeStatus } from '@/app/(protected)/_components/badge-status';
import { DeleteTransactionButton } from '@/app/(protected)/transactions/_components/delete-transaction/delete-transaction-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';
import { invoiceStatus } from '@/constants/invoices-constants';
import { EXPENSE } from '@/constants/transactions-contants';
import { Category } from '@/types/categories/category';
import { CreditCard } from '@/types/credit-cards/credit-card';
import { Invoice } from '@/types/invoices/invoice';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';

import { AddTransactionButton } from './add-transaction-invoices/add-transaction-button';
import { UpdateTransactionButton } from './update-transaction-invoices/update-transaction-button';

interface InvoiceTransactionsProps {
  invoice: Invoice;
  creditCards: CreditCard[];
  categories: Category[];
}

export function InvoiceTransactions({
  invoice,
  creditCards,
  categories,
}: InvoiceTransactionsProps) {
  const [showAll, setShowAll] = useState(false);

  const MAX_INSTALLMENTS_TO_SHOW = 10;

  const { installments } = invoice;

  const visibleInstallments = showAll
    ? installments
    : installments.slice(0, MAX_INSTALLMENTS_TO_SHOW);

  return (
    <Card className="gap-0">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <BadgeStatus
              dueDate={invoice.dueDate}
              status={invoice.status}
              fullDescription
            />

            {invoice.status === invoiceStatus.PARTIAL && (
              <span className="text-muted-foreground ml-2 block text-[12px]">
                Pago{' '}
                <span className="font-semibold">
                  {formatCurrency(invoice.paidAmount)}
                </span>
              </span>
            )}
          </div>

          <AddTransactionButton invoice={invoice} categories={categories} />
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableBody>
            {visibleInstallments.map((installment) => {
              const Icon = ICON_MAP[installment.transaction.category.icon];
              const { contentColor } =
                COLOR_MAP[installment.transaction.category.color as ColorName];

              const isExpense = installment.transaction.type === EXPENSE;

              return (
                <TableRow key={installment.id} className="hover:bg-transparent">
                  <TableCell className="w-full font-medium">
                    <div className="flex items-center gap-3">
                      <span
                        className={`${contentColor} inline-block rounded-full p-3`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="text-foreground flex flex-col gap-1">
                        <span>
                          {installment.transaction.description}{' '}
                          {installment.transaction.numberInstallments > 1 &&
                            `(${installment.number}/${installment.transaction.numberInstallments})`}
                        </span>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          {date_dd_MMM_yyyy(installment.dueDate)}
                          <span className="bg-muted-foreground inline-block h-1 w-1 rounded-full" />
                          {installment.transaction.category.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="min-w-50 text-right">
                    <div
                      className={`${isExpense ? 'text-destructive' : 'text-foreground'} text-right font-medium`}
                    >
                      {isExpense && `- `}

                      {formatCurrency(installment.amount)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <UpdateTransactionButton
                      installment={installment}
                      creditCards={creditCards}
                      categories={categories}
                    />

                    <DeleteTransactionButton installment={installment} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      {installments.length > MAX_INSTALLMENTS_TO_SHOW && (
        <CardFooter className="flex justify-center border-t pt-0">
          <Button
            variant="secondary"
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:text-primary/80"
          >
            {showAll ? 'Ver menos' : 'Ver todas'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
