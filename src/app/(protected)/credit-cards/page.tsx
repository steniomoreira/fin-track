import { getCreditCards } from '@/actions/credit-cards/get.cardit-cards';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { PageContainer } from '@/components/ui/page-container';

import { AddCreditCardButton } from './_components/add-credit-card-buttton';
import { CreditCard } from './_components/credit-card';

export default async function CreditCardsPage() {
  const { creditCards } = await getCreditCards();

  return (
    <PageContainer>
      <header className="flex items-end justify-between">
        <Headline>
          <HeadlineTitle>Gerenciamento de cartão de crédito</HeadlineTitle>
          <HeadlineDescription>
            Monitore e gerencie seus cartões de crédito em um só lugar.
          </HeadlineDescription>
        </Headline>
      </header>

      <div className="flex flex-wrap items-center gap-6">
        {creditCards.map((creditCard) => (
          <CreditCard key={creditCard.id} creditCard={creditCard} />
        ))}

        <AddCreditCardButton />
      </div>
    </PageContainer>
  );
}
