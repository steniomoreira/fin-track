import { Badge } from '@/components/ui/badge';
import { status as statusTransaction } from '@/constants/transactions-contants';

interface BadgeStatusTransactionsProps {
  status: 'LATE' | 'PAID' | 'PARTIAL' | 'PENDING';
  fullDescription?: boolean;
  dueDate?: Date;
}

const statusConfig = {
  PAID: {
    color: 'bg-green-600/10 text-green-600',
    label: 'Pago',
    fullLabel: 'Pagamento realizado',
  },
  PARTIAL: {
    color: 'bg-blue-500/10 text-blue-500',
    label: 'Parcial',
    fullLabel: 'Pagamento parcial',
  },
  LATE: {
    color: 'bg-destructive/10 text-destructive',
    label: 'Atrasado',
    fullLabel: 'Pagamento atrasado',
  },
  PENDING: {
    color: 'bg-yellow-600/10 text-yellow-600',
    label: 'Pendente',
    fullLabel: 'Pagamento pendente',
  },
};

export function BadgeStatusTransactions({
  status,
  fullDescription = false,
  dueDate,
}: BadgeStatusTransactionsProps) {
  const isLate = !!dueDate && dueDate < new Date();

  const isPartialLate = isLate && status === statusTransaction.PARTIAL;

  const resolvedStatus =
    isLate && status === statusTransaction.PENDING
      ? statusTransaction.LATE
      : status;

  const { color, label, fullLabel } = statusConfig[resolvedStatus];

  return (
    <Badge className={isPartialLate ? statusConfig.LATE.color : color}>
      {fullDescription ? fullLabel : label}
    </Badge>
  );
}
