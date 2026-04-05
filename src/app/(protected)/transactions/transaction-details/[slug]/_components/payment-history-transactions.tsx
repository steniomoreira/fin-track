import { useMemo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';

interface PaymentHistoryTransactionsProps {
  installment: Installment;
}

export function PaymentHistoryTransactions({
  installment,
}: PaymentHistoryTransactionsProps) {
  const paymentsWithBalance = useMemo(() => {
    return installment.payments.map((payment, index, arr) => {
      const paid = arr
        .slice(0, index + 1)
        .reduce((sum, p) => sum + p.amount, 0);
      return { ...payment, balance: installment.amount - paid };
    });
  }, [installment]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Pagamentos</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-25">Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="text-right">Cálculo de saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentsWithBalance.map(({ id, date, amount, balance }) => (
              <TableRow key={id} className="hover:bg-transparent">
                <TableCell className="font-medium">
                  {date_dd_MMM_yyyy(date)}
                </TableCell>
                <TableCell className="text-foreground flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-600" />
                  Pago
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(amount)}
                </TableCell>
                <TableCell className="text-foreground text-right">
                  {formatCurrency(balance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
