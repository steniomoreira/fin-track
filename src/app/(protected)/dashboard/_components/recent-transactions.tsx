'use client';

import { CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
import { EXPENSE, status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';

import { BadgeStatus } from '../../_components/badge-status';
import { getTotalPaid } from '../../transactions/utils/payments-utils';

interface RecentTransactionsProps {
  installments: Installment[];
  month: Date;
}

export function RecentTransactions({
  installments,
  month,
}: RecentTransactionsProps) {
  const [showAll, setShowAll] = useState(false);

  const MAX_INSTALLMENTS_TO_SHOW = 10;

  const visibleInstallments = showAll
    ? installments
    : installments.slice(0, MAX_INSTALLMENTS_TO_SHOW);

  return (
    <Card className="gap-0">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>Transações Recentes</CardTitle>
        <Link
          href={`/transactions${month ? `?month=${month}` : ''}`}
          className="text-primary"
        >
          Ir para a página de transações
        </Link>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableBody>
            {visibleInstallments.map((installment) => {
              const Icon = ICON_MAP[installment.transaction.category.icon];
              const { contentColor } =
                COLOR_MAP[installment.transaction.category.color as ColorName];

              const isExpense = installment.transaction.type === EXPENSE;

              const hasInvoice =
                !!installment.invoice &&
                (installment.invoice.status === invoiceStatus.OPEN ||
                  installment.invoice.status === invoiceStatus.CLOSED);

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
                  <TableCell className="text-muted-foreground min-w-[200px] space-y-2 text-xs">
                    <BadgeStatus
                      status={
                        installment.invoice
                          ? installment.invoice.status
                          : installment.status
                      }
                      dueDate={
                        installment.invoice
                          ? installment.invoice.dueDate
                          : installment.dueDate
                      }
                      closingDay={
                        installment.transaction.creditCard?.closingDay
                      }
                      fullDescription={hasInvoice}
                    />

                    {installment.transaction.creditCard && (
                      <div className="flex items-center gap-1">
                        <CreditCard className="h-4 w-4" />
                        {installment.transaction.creditCard.name} *****{' '}
                        {installment.transaction.creditCard.lastFourDigits}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="min-w-[200px] text-right">
                    <div
                      className={`${isExpense ? 'text-destructive' : 'text-foreground'} text-right font-medium`}
                    >
                      {isExpense && `- `}

                      {installment.status === status.PARTIAL ? (
                        <>
                          {formatCurrency(
                            installment.amount -
                              getTotalPaid(installment.payments)
                          )}

                          <span className="text-muted-foreground block text-[10px]">
                            Pago{' '}
                            <span className="font-semibold">
                              {formatCurrency(
                                getTotalPaid(installment.payments)
                              )}
                            </span>
                          </span>
                        </>
                      ) : (
                        formatCurrency(installment.amount)
                      )}
                    </div>
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
