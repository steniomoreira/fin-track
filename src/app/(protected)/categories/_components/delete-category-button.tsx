'use client';

import { Trash2 } from 'lucide-react';
import { ComponentProps, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Category } from '@/types/categories/category';

import { DeleteCategory } from './delete-category';

interface DeleteCategoryButtonProps extends ComponentProps<'button'> {
  category: Category;
}

export function DeleteCategoryButton({
  category,
  ...props
}: DeleteCategoryButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" {...props}>
          <Trash2 className="text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Deletar categoria</DialogTitle>
          <DialogDescription>
            Esta ação apagará permanentemente a categoria{' '}
            <span className="font-semibold capitalize">{category.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <DeleteCategory category={category} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
