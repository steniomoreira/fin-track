import { useState, useTransition } from 'react';

import { deleteCategory } from '@/actions/categories/delete-categories';
import { Category } from '@/types/categories/category';
import { toastMessage } from '@/utils/toast-utils';

export function useCategories() {
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [isPending, startTransition] = useTransition();

  const isLoading = isPending;

  function handleSelectedCategory(category?: Category) {
    setSelectedCategory(category);
  }

  function deleteCategoryById(id: string) {
    startTransition(async () => {
      try {
        const response = await deleteCategory({ id });

        toastMessage({ type: response.type, message: response.message });
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
    deleteCategoryById,
    selectedCategory,
    handleSelectedCategory,
  };
}
