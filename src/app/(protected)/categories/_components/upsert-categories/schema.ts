import z from 'zod';

export const schemaUpsertCategoryForm = z.object({
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  description: z.string().trim().optional(),
  icon: z.string({ message: 'Selecione um ícone' }),
  color: z.string({ message: 'Selecione uma cor' }),
});

export type UpsertCategoryFormData = z.infer<typeof schemaUpsertCategoryForm>;
