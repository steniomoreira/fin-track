'use client';

import { Category } from '@/types/categories/category';

import { useCategories } from '../hooks/useCategories';
import { CategoryCard } from './category-card';
import { UpsertCategoriesForm } from './upsert-categories/upsert-categories-form';

interface WrapperCategoriesProps {
  categories: Category[];
}

export function WrapperCategories({ categories }: WrapperCategoriesProps) {
  const { selectedCategory, handleSelectedCategory } = useCategories();

  return (
    <div className="m-auto grid w-full max-w-[1600px] grid-cols-[1fr_350px] gap-6">
      <div className="flex flex-wrap content-start gap-4">
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
              categoryToEdit={selectedCategory}
              onEdit={handleSelectedCategory}
            />
          );
        })}
      </div>
      <div>
        <UpsertCategoriesForm
          key={selectedCategory?.id ?? 'new'}
          category={selectedCategory}
          onEdit={handleSelectedCategory}
        />
      </div>
    </div>
  );
}
