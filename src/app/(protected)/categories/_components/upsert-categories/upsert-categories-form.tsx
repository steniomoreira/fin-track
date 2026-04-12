'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Shapes, X } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { COLOR_MAP, COLOR_NAMES } from '@/constants/colors-constants';
import { ICON_MAP, ICON_NAMES } from '@/constants/icons-constants';
import { Category } from '@/types/categories/category';

import { useCategories } from '../../hooks/useCategories';
import { schemaUpsertCategoryForm, UpsertCategoryFormData } from './schema';

interface UpsertCategoriesFormProps {
  category?: Category;
  onEdit: (category?: Category) => void;
}

export function UpsertCategoriesForm({
  category,
  onEdit,
}: UpsertCategoriesFormProps) {
  const { handleUpsertCategory } = useCategories();

  const form = useForm<UpsertCategoryFormData>({
    resolver: zodResolver(schemaUpsertCategoryForm),
    defaultValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
      icon: category?.icon ?? 'Tag',
      color: category?.color ?? 'black',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const action = category ? () => onEdit() : () => form.reset();

  async function onSubmit(data: UpsertCategoryFormData) {
    const categoryData = {
      ...data,
      id: category?.id,
    };

    await handleUpsertCategory({ category: categoryData, action });
  }

  return (
    <Card className={`relative ${category && 'ring-primary'}`}>
      <Button
        className={`absolute top-2.5 right-2.5 ${!category && 'hidden'}`}
        variant="ghost"
        size="icon"
        onClick={() => onEdit()}
      >
        <X className="h-4 w-4" />
      </Button>

      <CardHeader>
        <CardTitle>{`${category ? 'Editar ' + category.name : 'Adicionar nova categoria'} `}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="name">Nome da categoria</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    autoFocus
                    placeholder="Ex: Entretenimento"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="description">
                    Descrição (opcional)
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Ex: Streaming, cinema, shows, eventos, hobbies..."
                    className="min-h-[100px] resize-none"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Controller
            name="icon"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Selecione um ícone</FieldLabel>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {ICON_NAMES.map((name) => {
                    const Icon = ICON_MAP[name];
                    const isSelected = field.value === name;
                    return (
                      <Button
                        key={name}
                        type="button"
                        variant={isSelected ? 'default' : 'outline'}
                        className={`h-12 w-12 cursor-pointer transition-all ${
                          isSelected
                            ? 'ring-primary ring-offset-background ring-2 ring-offset-2'
                            : ''
                        }`}
                        onClick={() => field.onChange(name)}
                        disabled={isLoading}
                      >
                        <Icon />
                      </Button>
                    );
                  })}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Selecione uma cor</FieldLabel>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {COLOR_NAMES.map((name) => {
                    const { bgColor } = COLOR_MAP[name];
                    const isSelected = field.value === name;
                    return (
                      <Button
                        key={name}
                        type="button"
                        className={`h-9 w-9 cursor-pointer rounded-full transition-all hover:${bgColor} hover:opacity-80 ${bgColor} ${
                          isSelected
                            ? 'ring-primary ring-offset-background ring-2 ring-offset-2'
                            : ''
                        }`}
                        onClick={() => field.onChange(name)}
                        disabled={isLoading}
                      />
                    );
                  })}
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Separator />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                {category ? 'Atualizando...' : 'Adicionando...'}
              </>
            ) : (
              <>
                <Shapes />
                {category ? 'Atualizar categoria' : 'Criar categoria'}
              </>
            )}
          </Button>

          <Button
            className="w-full"
            type="button"
            variant="ghost"
            disabled={isLoading || !form.formState.isDirty}
            onClick={action}
          >
            Descartar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
