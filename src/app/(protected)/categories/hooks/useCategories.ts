import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deleteCategory } from '@/actions/categories/delete-categories';
import { upsertCategory } from '@/actions/categories/upsett-categories';
import { UpsertCategoryParams } from '@/actions/categories/upsett-categories/schema';
import { Category } from '@/types/categories/category';
import { toastMessage, toastTypes } from '@/utils/toast-utils';

interface HandleUpsertCategoryParams {
  category: UpsertCategoryParams;
  action: () => void;
}

interface DeleteCategoryByIdParams {
  id: string;
  action: () => void;
}

export function useCategories() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isPending, startTransition] = useTransition();

  const isLoading = isPending;

  function handleSelectedCategory(category?: Category) {
    setSelectedCategory(category);
  }

  async function handleUpsertCategory({
    category,
    action,
  }: HandleUpsertCategoryParams) {
    try {
      const response = await upsertCategory(category);

      toastMessage({ type: response.type, message: response.message });

      if (response.type === toastTypes.SUCCESS) {
        action();
      }
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de criação da categoria!');
    }
  }

  function deleteCategoryById({ id, action }: DeleteCategoryByIdParams) {
    startTransition(async () => {
      try {
        const response = await deleteCategory({ id });

        toastMessage({ type: response.type, message: response.message });

        if (response.type === toastTypes.SUCCESS) {
          action();
        }
      } catch (error) {
        console.error(error);
        toastMessage({
          type: 'error',
          message: 'Ocorreu um erro ao deletar a categoria!',
        });
      }
    });
  }

  return {
    isLoading,
    handleUpsertCategory,
    deleteCategoryById,
    selectedCategory,
    handleSelectedCategory,
  };
}
