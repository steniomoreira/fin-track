'use client';

import { Loader, Pencil, Trash2, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';
import { Category } from '@/types/categories/category';

import { useCategories } from '../hooks/useCategories';

interface CategoryCardProps {
  category: Category;
  categoryToEdit?: Category;
  onEdit: (category?: Category) => void;
}

export function CategoryCard({
  category,
  categoryToEdit,
  onEdit,
}: CategoryCardProps) {
  const { isLoading, deleteCategoryById } = useCategories();

  const Icon = ICON_MAP[category.icon];
  const { contentColor } = COLOR_MAP[category.color as ColorName];

  const isActiveCard = categoryToEdit?.id === category.id;
  const isDisabled = isLoading || isActiveCard;

  return (
    <div
      className={`bg-card ring-card relative h-[180px] w-[290px] space-y-2 rounded-sm p-6 ring-1 ${isActiveCard && 'ring-primary'}`}
    >
      <span
        className={`${contentColor} flex h-10 w-10 items-center justify-center rounded-full p-2`}
      >
        <Icon className="h-4 w-4" />
      </span>

      <Button
        className={`absolute top-2.5 right-2.5 ${!isActiveCard && 'hidden'}`}
        variant="ghost"
        size="icon"
        onClick={() => onEdit()}
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold capitalize">{category.name}</h2>
        <p className="mb-4 text-xs text-white/70">{category.description}</p>
      </div>

      <div className="absolute right-2.5 bottom-2.5 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(category)}
          disabled={isDisabled}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          disabled={isDisabled}
          onClick={() => deleteCategoryById(category.id)}
        >
          {isLoading ? (
            <Loader className="text-destructive animate-spin" />
          ) : (
            <Trash2 className="text-destructive" />
          )}
        </Button>
      </div>
    </div>
  );
}
