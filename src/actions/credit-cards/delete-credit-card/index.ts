'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { toastTypes } from '@/utils/toast-utils';

import { DeleteCreditCardParams, shemaDeleteCreditCard } from './schema';

export const deleteCreditCard = async (data: DeleteCreditCardParams) => {
  const result = shemaDeleteCreditCard.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  try {
    const hasTransactions = await db.transaction.findFirst({
      where: { creditCardId: data.id },
    });

    if (hasTransactions) {
      return {
        type: toastTypes.WARNING,
        message:
          'Não é possível deletar, pois existem contas vinculadas a este cartão.',
      };
    }

    await db.creditCard.delete({
      where: { id: data.id },
    });

    revalidatePath('/credit-cards');

    return {
      type: toastTypes.SUCCESS,
      message: 'Cartão deletado com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de deleção do cartão!',
    };
  }
};
