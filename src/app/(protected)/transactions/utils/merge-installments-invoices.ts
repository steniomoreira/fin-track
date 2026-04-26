import { EXPENSE } from '@/constants/transactions-contants';
import { Invoice } from '@/types/invoices/invoice';
import { Installment } from '@/types/transactions/installment';

export function mergeInstallmentsAndInvoices(
  installments: Installment[],
  invoices: Invoice[]
): Installment[] {
  const filteredInstallments = installments.filter(
    (installment) => installment.invoiceId === null
  );

  const invoiceInstallments: Installment[] = invoices.map((invoice) => {
    return {
      id: invoice.id,
      dueDate: invoice.dueDate,
      hashCode: `invoice-${invoice.id}`,
      slug: `invoice-${invoice.id}`,
      amount: invoice.totalAmount,
      status: invoice.status,
      number: 1,
      invoiceId: invoice.id,
      transaction: {
        id: `tx-invoice-${invoice.id}`,
        description: invoice.creditCard.name,
        type: EXPENSE,
        numberInstallments: 1,
        category: {
          id: `cat-invoice-${invoice.id}`,
          name: 'Fatura',
          icon: 'CreditCard',
          color: invoice.creditCard.color,
        },
        creditCard: invoice.creditCard,
      },
      payments: invoice.payments,
    } as Installment;
  });

  return [...filteredInstallments, ...invoiceInstallments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}
