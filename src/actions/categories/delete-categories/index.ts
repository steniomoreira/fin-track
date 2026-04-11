'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { toastTypes } from '@/utils/toast-utils';

import { DeleteCategoryParams, schemaDeleteCategory } from './schema';

export const deleteCategory = async (data: DeleteCategoryParams) => {
  const result = schemaDeleteCategory.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  try {
    const hasTransactions = await db.transaction.findFirst({
      where: { categoryId: data.id },
    });

    if (hasTransactions) {
      return {
        type: toastTypes.WARNING,
        message:
          'Ops! Não é possível deletar esta categoria, pois existem contas vinculadas a ela.',
      };
    }

    await db.category.delete({
      where: { id: data.id },
    });

    revalidatePath('/categories');

    return {
      type: toastTypes.SUCCESS,
      message: 'Categoria deletada com sucesso!',
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: 'Ocorreu um erro no processo de deleção da categoria!',
    };
  }
};
