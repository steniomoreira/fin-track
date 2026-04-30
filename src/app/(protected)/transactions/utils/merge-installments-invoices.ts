import { EXPENSE, INCOME } from '@/constants/transactions-contants';
import { Invoice } from '@/types/invoices/invoice';
import { Installment } from '@/types/transactions/installment';
import { generateHash } from '@/utils/hash-utils';

export function mergeInstallmentsAndInvoices(
  installments: Installment[],
  invoices: Invoice[]
): Installment[] {
  const filteredInstallments = installments.filter(
    (installment) => installment.invoiceId === null
  );

  const invoiceInstallments: Installment[] = invoices.map((invoice) => {
    const hashCode = generateHash();

    const type = invoice.totalAmount >= 0 ? EXPENSE : INCOME;

    return {
      id: invoice.id,
      dueDate: invoice.dueDate,
      hashCode,
      slug: invoice.slug,
      amount: type === INCOME ? invoice.totalAmount * -1 : invoice.totalAmount,
      status: invoice.status,
      number: 1,
      invoiceId: invoice.id,
      transaction: {
        id: `tx-invoice-${hashCode}`,
        description: invoice.creditCard.name,
        type,
        numberInstallments: 1,
        category: {
          id: invoice.creditCard.id,
          name: 'Cartão de crédito',
          icon: 'CreditCard',
          color: invoice.creditCard.color,
        },
        creditCard: invoice.creditCard,
      },
      payments: invoice.payments,
      invoice: {
        slug: invoice.slug,
        status: invoice.status,
        dueDate: invoice.dueDate,
      },
    } as unknown as Installment;
  });

  return [...filteredInstallments, ...invoiceInstallments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );
}
