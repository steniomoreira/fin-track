import Link from 'next/link';

import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { CreditCard as CreditCardType } from '@/types/credit-cards/credit-card';
import { formatCurrency } from '@/utils/currency-utils';
import { createSlug } from '@/utils/slug-utils';

import { formatCreditCardNumber } from '../utils/credit-card-utils';
import { DeleteCreditCardButton } from './delete-credit-card-button';
import { UpsertCreditCardButton } from './upsert-credit-card-button';

interface CreditCardProps {
  creditCard: CreditCardType;
  totalInvoiceValue?: number;
}

export function CreditCard({ creditCard, totalInvoiceValue }: CreditCardProps) {
  const url = `/credit-cards/invoices?card=${createSlug(creditCard.name)}`;
  return (
    <div
      className={`${
        COLOR_MAP[creditCard.color as ColorName].bgColor
      } relative flex h-45 w-75 flex-col justify-between rounded-sm p-6`}
    >
      <Link href={url} className="absolute inset-0" />

      <h2 className="text-lg font-semibold">{creditCard.name}</h2>

      {totalInvoiceValue !== undefined && (
        <h2 className="text-2xl font-bold">
          {formatCurrency(totalInvoiceValue)}
        </h2>
      )}

      <p className="mb-4 text-xs font-semibold tracking-widest text-white/70">
        **** **** **** {formatCreditCardNumber(creditCard.lastFourDigits)}
      </p>

      <div className="absolute right-2.5 bottom-2.5 z-10 flex items-center">
        <UpsertCreditCardButton creditCard={creditCard} />
        <DeleteCreditCardButton creditCard={creditCard} />
      </div>
    </div>
  );
}
