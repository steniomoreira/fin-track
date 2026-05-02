import { PrismaClient } from '@/generated/prisma/client';
import { TransactionType } from '@/generated/prisma/enums';

type TransactionClient = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];

export async function recalculateInvoiceTotal(
  tx: TransactionClient,
  invoiceId: string
) {
  const [expenses, incomes] = await Promise.all([
    tx.installment.aggregate({
      where: { invoiceId, transaction: { type: TransactionType.EXPENSE } },
      _sum: { amount: true },
    }),
    tx.installment.aggregate({
      where: { invoiceId, transaction: { type: TransactionType.INCOME } },
      _sum: { amount: true },
    }),
  ]);

  const totalAmount = (expenses._sum.amount ?? 0) - (incomes._sum.amount ?? 0);

  await tx.invoice.update({
    where: { id: invoiceId },
    data: { totalAmount },
  });
}
