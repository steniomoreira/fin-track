'use client';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COLOR_MAP, ColorName } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';
import { Category } from '@/types/categories/category';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
}

export function CategoryCard({ category, onEdit }: CategoryCardProps) {
  const Icon = ICON_MAP[category.icon];
  const { contentColor } = COLOR_MAP[category.color as ColorName];

  return (
    <Card key={category.id}>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className={`${contentColor} inline-block rounded-full p-2`}>
          <Icon className="h-4 w-4" />
        </span>
        <p>{category.description}</p>

        <Button onClick={() => onEdit(category)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
