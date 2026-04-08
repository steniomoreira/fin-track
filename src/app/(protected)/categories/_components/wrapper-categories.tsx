'use client';

import { useState } from 'react';

import { Category } from '@/types/categories/category';

import { CategoryCard } from './category-card';
import { UpsertCategoriesForm } from './upsert-categories/upsert-categories-form';

interface WrapperCategoriesProps {
  categories: Category[];
}

export function WrapperCategories({ categories }: WrapperCategoriesProps) {
  const [categoryToEdit, setCategoryToEdit] = useState<Category>();

  function handleEditCategory(category?: Category) {
    setCategoryToEdit(category);
  }

  return (
    <div className="grid grid-cols-[1fr_350px] gap-6">
      <div>
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEditCategory}
            />
          );
        })}
      </div>
      <div>
        <UpsertCategoriesForm
          key={categoryToEdit?.id ?? 'new'}
          category={categoryToEdit}
          onEdit={handleEditCategory}
        />
      </div>
    </div>
  );
}
