import { Pencil, RefreshCcwDot, TrendingDown, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getInstallmentTransactionById } from '@/actions/transactions/get-installmet-transaction-by-id';
import { BadgeStatusTransactions } from '@/app/(protected)/_components/badge-status-transactions';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { Separator } from '@/components/ui/separator';
import { INCOME } from '@/constants/transactions-contants';
import { formatCurrency } from '@/utls/currency-utils';
import { date_dd_MMMM_yyyy } from '@/utls/date-utils';

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

          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold">
              {formatCurrency(installment.amount || 0)}
            </span>
            <span className="text-muted-foreground text-sm">
              para {date_dd_MMMM_yyyy(installment.dueDate)}
            </span>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
