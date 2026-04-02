import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calculator,
  CreditCard,
  Home,
  Pencil,
  RefreshCcwDot,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { notFound } from 'next/navigation';

import { getInstallmentTransactionById } from '@/actions/transactions/get-installmet-transaction-by-id';
import { BadgeStatusTransactions } from '@/app/(protected)/_components/badge-status-transactions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { INCOME } from '@/constants/transactions-contants';
import { formatCurrency } from '@/utls/currency-utils';
import { date_dd_MMM_yyyy, date_dd_MMMM_yyyy } from '@/utls/date-utils';

import { getTotalPaid } from '../../utils/payments-utils';
import { BackButton } from './_components/back-button';
import { TransactionDetailsBreadcrumbs } from './_components/transaction-details-breadcrumbs';

interface TransactionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailsPage({
  params,
}: TransactionDetailsPageProps) {
  const { id } = await params;
  const { installment } = await getInstallmentTransactionById(id);

  if (!installment) {
    notFound();
  }

  return (
    <PageContainer>
      <TransactionDetailsBreadcrumbs />

      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />

          <Headline>
            <HeadlineTitle className="capitalize">
              {installment.transaction?.description}
            </HeadlineTitle>
            <HeadlineDescription>ID: {installment.id}</HeadlineDescription>
          </Headline>
        </div>

        <div className="space-x-4">
          <Button variant="outline">
            <Pencil />
            Editar
          </Button>
          <Button variant="destructive">
            <RefreshCcwDot />
            Estornar
          </Button>
        </div>
      </header>

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

          <div className="grid grid-cols-4 gap-4">
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
              {installment.payments.map(({ id, date, amount }) => (
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
                    {formatCurrency((installment.amount -= amount))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
