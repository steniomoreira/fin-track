'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/prisma';
import { requireSession } from '@/lib/session';
import { toastTypes } from '@/utils/toast-utils';

import { schemaUpsertCategory, UpsertCategoryParams } from './schema';

export async function upsertCategory(data: UpsertCategoryParams) {
  const session = await requireSession();

  const result = schemaUpsertCategory.safeParse(data);

  if (!result.success) {
    throw new Error('Erro de validação');
  }

  const isEditing = !!data.id;

  try {
    const existCategory = await db.category.findFirst({
      where: {
        name: { equals: data.name, mode: 'insensitive' },
        ...(isEditing && { id: { not: data.id } }),
      },
    });

    if (existCategory) {
      return {
        type: toastTypes.WARNING,
        message: 'Esta categoria já foi cadastrada!',
      };
    }

    await db.category.upsert({
      where: { id: data.id ?? '' },
      update: {
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
      create: {
        userId: session.user.id,
        name: data.name,
        description: data.description,
        icon: data.icon,
        color: data.color,
      },
    });

    revalidatePath('/categories');

    return {
      type: toastTypes.SUCCESS,
      message: `Categoria ${isEditing ? 'atualizada' : 'criada'} com sucesso!`,
    };
  } catch (error) {
    console.error(error);
    return {
      type: toastTypes.ERROR,
      message: `Ocorreu um erro no processo da ${isEditing ? 'atualização' : 'criação'} da categoria!`,
    };
  }
}
