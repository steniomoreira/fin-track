'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/invoices/invoice';
import { formatDateToMonthYear } from '@/utils/date-utils';

interface InvoiceNavigationProps {
  invoices: Invoice[];
  invoiceRef: string;
}

export function InvoiceNavigation({
  invoices,
  invoiceRef,
}: InvoiceNavigationProps) {
  const { replace } = useRouter();
  const pathname = usePathname();

  const addQueryParams = (card: string, ref: string) => {
    const params = new URLSearchParams();

    params.set('card', card);
    params.set('ref', ref);

    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex w-full items-center gap-2">
      {invoices.map((invoice) => {
        const selectedDate = formatDateToMonthYear(invoice.dueDate);

        return (
          <Button
            key={invoice.id}
            className="capitalize"
            variant={selectedDate === invoiceRef ? 'default' : 'outline'}
            onClick={() =>
              addQueryParams(
                invoice.creditCard.name.toLocaleLowerCase(),
                selectedDate
              )
            }
          >
            {format(invoice.dueDate, 'MMM yyyy', { locale: ptBR })}
          </Button>
        );
      })}
    </div>
  );
}
