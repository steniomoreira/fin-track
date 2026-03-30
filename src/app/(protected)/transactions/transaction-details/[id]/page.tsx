import { Home, Pencil, RefreshCcwDot } from 'lucide-react';
import { notFound } from 'next/navigation';

import { getInstallmentTransactionById } from '@/actions/transactions/get-installmet-transaction-by-id';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/utls/currency-utils';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';

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
            <span className="text-primary bg-muted rounded-full p-3">
              <Home className="h-6 w-6" />
            </span>

            <div className="flex flex-col gap-3">
              <Badge className="bg-blue-500/10 text-blue-500">
                Pagamento parcial
              </Badge>
              <span className="text-muted-foreground self-end text-xs">
                10 de março de 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-3xl font-bold">
              {formatCurrency(installment.amount || 0)}
            </span>
            <span className="text-muted-foreground text-sm font-semibold">
              {date_dd_MMM_yyyy(installment.dueDate)}
            </span>
          </div>

          <Separator />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
