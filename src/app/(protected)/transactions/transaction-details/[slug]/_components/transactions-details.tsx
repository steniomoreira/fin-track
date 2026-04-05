import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  CreditCard,
  Home,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

import { BadgeStatusTransactions } from '@/app/(protected)/_components/badge-status-transactions';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { INCOME } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';
import { formatCurrency } from '@/utils/currency-utils';
import { date_dd_MMMM_yyyy } from '@/utils/date-utils';

import { getTotalPaid } from '../../../utils/payments-utils';

interface TransactionsDetailsProps {
  installment: Installment;
}

export function TransactionsDetails({ installment }: TransactionsDetailsProps) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          {installment.transaction.type === INCOME ? (
            <span className={`rounded-md bg-green-600/10 p-3 text-green-600`}>
              <TrendingUp className="h-6 w-6" />
            </span>
          ) : (
            <span
              className={`bg-destructive/10 text-destructive rounded-md p-3`}
            >
              <TrendingDown className="h-6 w-6" />
            </span>
          )}

          <div className="flex flex-col items-end gap-3">
            <BadgeStatusTransactions
              status={installment.status}
              fullDescription
              dueDate={installment.dueDate}
            />
            <span className="text-muted-foreground text-xs">
              {installment.payments.length > 0 &&
                date_dd_MMMM_yyyy(
                  installment.payments[installment.payments.length - 1].date
                )}
            </span>
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-2">
          <span className="text-3xl font-bold">
            {formatCurrency(installment.amount || 0)}
            <span className="text-muted-foreground ml-2 text-sm font-semibold">
              {installment.transaction.numberInstallments &&
                `(${installment.number}/${installment.transaction.numberInstallments})`}
            </span>
          </span>
          <span className="text-muted-foreground text-sm">
            para {date_dd_MMMM_yyyy(installment.dueDate)}
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-4">
            <h2 className="text-muted-foreground uppercase">Categoria</h2>
            <div className="flex items-center gap-2 capitalize">
              <Home className="text-primary" />
              {installment.transaction.category.name}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-muted-foreground uppercase">
              Método de pagamento
            </h2>
            <div className="flex items-center gap-2">
              {installment.transaction.creditCard?.name ? (
                <>
                  <CreditCard className="text-muted-foreground/80" />
                  {installment.transaction.creditCard.name} *****{' '}
                  {installment.transaction.creditCard?.cardNumber.slice(-4)}
                </>
              ) : (
                <>
                  <Wallet className="text-muted-foreground/80" />
                  Carteira
                </>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-muted-foreground uppercase">Tipo de conta</h2>
            <div className="flex items-center gap-2">
              {installment.transaction.type === INCOME ? (
                <>
                  <TrendingUp className="text-green-600" />
                  Receita
                </>
              ) : (
                <>
                  <TrendingDown className="text-destructive" />
                  Despesa
                </>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-muted-foreground uppercase">
              {`Valor ${installment.transaction.type === INCOME ? 'recebido' : 'pago'}`}
            </h2>
            <div className="flex items-center gap-2">
              <Banknote
                className={`${installment.transaction.type === INCOME ? 'text-green-600' : 'text-destructive'}`}
              />

              {formatCurrency(getTotalPaid(installment.payments))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-muted-foreground uppercase">
              {`Saldo ${installment.transaction.type === INCOME ? 'a receber' : 'devedor'}`}
            </h2>
            <div className="flex items-center gap-2">
              {installment.transaction.type === INCOME ? (
                <BanknoteArrowUp className="text-green-600" />
              ) : (
                <BanknoteArrowDown className="text-destructive" />
              )}

              {formatCurrency(
                installment.amount - getTotalPaid(installment.payments)
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
