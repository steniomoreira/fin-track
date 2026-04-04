'use client';

import { Loader, Siren } from 'lucide-react';
import { useTransition } from 'react';

import { deleteTransaction } from '@/actions/transactions/delete-transaction';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { status } from '@/constants/transactions-contants';
import { Installment } from '@/types/transactions/installment';
import { toastMessage } from '@/utls/toast-utils';

interface DeleteTransactionProps {
  installment: Installment;
  onClose: () => void;
}

export function DeleteTransaction({
  installment,
  onClose,
}: DeleteTransactionProps) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const response = await deleteTransaction(installment);
      toastMessage({ type: response.type, message: response.message });
    });

    onClose();
  }

  return (
    <DialogContent className="sm:max-w-106.25">
      <DialogHeader>
        <DialogTitle>Apagar lançamento</DialogTitle>
        <DialogDescription>
          Esta ação apagará permanentemente o lançamento{' '}
          {installment.status === status.PARTIAL &&
            'e todos os seus registros de pagamentos'}
          .
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center justify-center gap-4">
        <Siren className="text-destructive h-14 w-14" />
        <p className="px-2 text-center">
          Tem certeza que deseja apagar o lançamento{' '}
          <span className="block">
            <strong className="text-lg">
              {installment.transaction.description}
            </strong>{' '}
            ?
          </span>
        </p>
      </div>

      <DialogFooter className="md:justify-center">
        <Button
          className="md:w-40"
          type="button"
          onClick={onSubmit}
          disabled={isPending}
          variant="destructive"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin text-red-300" />
              Deletando...
            </>
          ) : (
            'Sim, quero apagar!'
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
