import z from 'zod';

export const schemaUpsertCategoryForm = z.object({
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  description: z.string().trim().optional(),
  icon: z.string({ message: 'Nenhum ícone foi selecionado' }),
  color: z.string({ message: 'Nenhuma cor foi selecionada' }),
});

export type UpsertCategoryFormData = z.infer<typeof schemaUpsertCategoryForm>;
