'use client';

import { Loader, RefreshCcwDot } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { paymentReversalTransaction } from '@/actions/transactions/payment-reversal-transaction';
import { Button } from '@/components/ui/button';
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
import { toastMessage, toastTypes } from '@/utils/toast-utils';

interface TablePaymentHistoryTransactionProps {
  installment: Installment;
  onClose: () => void;
}

export function TablePaymentHistoryTransaction({
  installment,
  onClose,
}: TablePaymentHistoryTransactionProps) {
  const [isPending, startTransition] = useTransition();
  const [pendingPaymentId, setPendingPaymentId] = useState<string | null>(null);

  const payments = installment.payments;
  const hasPayment = payments.length - 1 > 0;

  const handlePaymentReversal = (paymentId: string) => {
    setPendingPaymentId(paymentId);
    startTransition(async () => {
      try {
        const response = await paymentReversalTransaction({
          installmentId: installment.id,
          paymentId,
        });

        toastMessage({ type: response.type, message: response.message });

        if (response.type === toastTypes.SUCCESS && !hasPayment) {
          onClose();
        }
      } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro no processo de estorno!');
      } finally {
        setPendingPaymentId(null);
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-25">Data</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {installment.payments.map(({ id, date, amount }) => (
          <TableRow key={id} className="hover:bg-transparent">
            <TableCell className="font-medium">
              {date_dd_MMM_yyyy(date)}
            </TableCell>
            <TableCell className="text-foreground flex h-18 items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              Pago
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(amount)}
            </TableCell>
            <TableCell className="w-45.5">
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handlePaymentReversal(id)}
                disabled={isPending}
              >
                {isPending && pendingPaymentId === id ? (
                  <>
                    <Loader className="animate-spin" />
                    Estornando...
                  </>
                ) : (
                  <>
                    <RefreshCcwDot />
                    Estornar
                  </>
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
