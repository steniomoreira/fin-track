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

  const isEditing = !!data.id;

  try {
    const existCreditCard = await db.creditCard.findFirst({
      where: {
        userId: session.user.id,
        name: { equals: data.name, mode: 'insensitive' },
        ...(isEditing && { id: { not: data.id } }),
      },
    });

    if (existCreditCard) {
      return {
        type: toastTypes.WARNING,
        message: 'Este cartão já foi cadastrado!',
      };
    }

    await db.creditCard.upsert({
      where: { id: data.id ?? '' },
      update: {
        name: data.name,
        lastFourDigits: data.lastFourDigits,
        color: data.color,
        closingDay: data.closingDay,
        dueDay: data.dueDay,
        limit: data.limit,
      },
      create: {
        userId: session.user.id,
        name: data.name,
        lastFourDigits: data.lastFourDigits,
        color: data.color,
        closingDay: data.closingDay,
        dueDay: data.dueDay,
        limit: data.limit,
      },
    });

    revalidatePath('/credit-cards');

    return {
      type: toastTypes.SUCCESS,
      message: `Cartão ${isEditing ? 'atualizado' : 'criado'} com sucesso!`,
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: `Ocorreu um erro no processo da ${isEditing ? 'atualização' : 'criação'} do cartão!`,
    };
  }
}
