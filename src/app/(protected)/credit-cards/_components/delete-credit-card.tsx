'use client';

import { Loader, Siren } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { deleteCreditCard } from '@/actions/credit-cards/delete-credit-card';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { CreditCard } from '@/types/credit-cards/credit-card';
import { toastMessage, toastTypes } from '@/utils/toast-utils';

interface DeleteCreditCardProps {
  creditCard: CreditCard;
  onClose: () => void;
}

export function DeleteCreditCard({
  creditCard,
  onClose,
}: DeleteCreditCardProps) {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      try {
        const response = await deleteCreditCard({
          id: creditCard.id,
        });

        toastMessage({ type: response.type, message: response.message });

        if (response.type === toastTypes.SUCCESS) {
          onClose();
        }
      } catch (error) {
        console.error(error);
        toast.error('Ocorreu um erro ao deletar o cartão de crédito!');
      }
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Siren className="text-destructive h-14 w-14" />
        <p className="px-2 text-center">
          Tem certeza que deseja deletar o cartão de crédito{' '}
          <span className="block">
            <strong className="text-lg">{creditCard.name}</strong> ?
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
    </>
  );
}
