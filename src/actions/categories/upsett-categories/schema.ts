import z from 'zod';

export const schemaUpsertCategory = z.object({
  id: z.cuid('ID inválido').optional(),
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  description: z.string().trim().optional(),
  icon: z.string({ message: 'Nenhum ícone foi selecionado' }),
  color: z.string({ message: 'Nenhuma cor foi selecionada' }),
});

export type UpsertCategoryParams = z.infer<typeof schemaUpsertCategory>;
