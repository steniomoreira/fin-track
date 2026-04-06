import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CreditCard as CreditCardType } from '@/types/credit-cards/credit-card';
import { formatCreditCardNumber } from '@/utils/credit-card-utils';

import { UpdateCreditCardButton } from './update-credit-card-button';

interface CreditCardProps {
  creditCard: CreditCardType;
}

export function CreditCard({ creditCard }: CreditCardProps) {
  return (
    <div className="bg-background relative flex h-[180px] w-[300px] flex-col justify-between rounded-sm p-6">
      <h2 className="text-lg font-semibold uppercase">{creditCard.name}</h2>
      <p className="mb-4 text-xs font-semibold tracking-widest text-white/70">
        {formatCreditCardNumber(creditCard.cardNumber)}
      </p>

      <div className="absolute right-2.5 bottom-2.5 flex items-center">
        <div>
          <UpdateCreditCardButton creditCard={creditCard} />
        </div>
        <div>
          <Button size="icon" variant="ghost">
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>
    </div>
  );
}
