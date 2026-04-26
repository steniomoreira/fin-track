import { Badge } from '@/components/ui/badge';
import { invoiceStatus } from '@/constants/invoices-constants';
import { status as statusTransaction } from '@/constants/transactions-contants';
import { checkIsLate } from '@/utils/date-utils';
import { checkIsInvoiceClosed } from '@/utils/invoice-utils';

interface BadgeStatusProps {
  status: keyof typeof statusConfig;
  fullDescription?: boolean;
  dueDate: Date;
  closingDay?: number;
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
  OPEN: {
    color: 'bg-yellow-600/10 text-yellow-600',
    label: 'Aberta',
    fullLabel: 'Fatura aberta',
  },
  CLOSED: {
    color: 'bg-black/50 text-gray-300',
    label: 'Fechada',
    fullLabel: 'Fatura fechada',
  },
};

export function BadgeStatus({
  status,
  fullDescription = false,
  dueDate,
  closingDay,
}: BadgeStatusProps) {
  const isLate = checkIsLate(dueDate);

  const isInvoiceClosed = closingDay
    ? checkIsInvoiceClosed(dueDate, closingDay)
    : false;

  const isPartialLate = isLate && status === statusTransaction.PARTIAL;

  const getResolvedStatus = () => {
    const isPendingOrOpen =
      status === statusTransaction.PENDING || status === invoiceStatus.OPEN;

    if (isLate && isPendingOrOpen) {
      return statusTransaction.LATE as keyof typeof statusConfig;
    }

    const isPaidOrPartial =
      status === invoiceStatus.PARTIAL || status === invoiceStatus.PAID;

    if (isInvoiceClosed && !isPaidOrPartial) {
      return invoiceStatus.CLOSED as keyof typeof statusConfig;
    }

    return status;
  };

  const resolvedStatus = getResolvedStatus();

  const { color, label, fullLabel } = statusConfig[resolvedStatus];

  return (
    <Badge className={isPartialLate ? statusConfig.LATE.color : color}>
      {fullDescription ? fullLabel : label}
    </Badge>
  );
}
