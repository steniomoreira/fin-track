'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { schemaUpsertCreditCard, UpsertCreditCardParams } from './schema';

export async function upsertCreditCard(data: UpsertCreditCardParams) {
  const session = await requireSession();

  const result = schemaUpsertCreditCard.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  try {
    await db.creditCard.upsert({
      where: { id: data.id ?? '' },
      update: {
        name: data.name,
        cardNumber: data.cardNumber,
        color: data.color,
      },
      create: {
        userId: session.user.id,
        name: data.name,
        cardNumber: data.cardNumber,
        color: data.color,
      },
    });

    revalidatePath('/credit-cards');

    return {
      type: toastTypes.SUCCESS,
      message: 'Cartão criado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo da criação do cartão!',
    };
  }
}
