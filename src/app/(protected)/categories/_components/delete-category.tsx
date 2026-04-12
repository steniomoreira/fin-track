'use client';

import { Loader, Siren } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Category } from '@/types/categories/category';

import { useCategories } from '../hooks/useCategories';

interface DeleteCategoryProps {
  category: Category;
  onClose: () => void;
}

export function DeleteCategory({ category, onClose }: DeleteCategoryProps) {
  const { isLoading, deleteCategoryById } = useCategories();

  function onSubmit() {
    deleteCategoryById({ id: category.id, action: onClose });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4">
        <Siren className="text-destructive h-14 w-14" />
        <p className="px-2 text-center">
          Tem certeza que deseja deletar a categoria{' '}
          <span className="block">
            <strong className="text-lg capitalize">{category.name}</strong> ?
          </span>
        </p>
      </div>

      <DialogFooter className="md:justify-center">
        <Button
          className="md:w-40"
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          variant="destructive"
        >
          {isLoading ? (
            <>
              <Loader className="animate-spin text-red-300" />
              Deletando...
            </>
          ) : (
            'Sim, quero apagar!'
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
