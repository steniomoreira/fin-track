import { z } from 'zod';

export const schemaDeleteCategory = z.object({
  id: z.string().min(1, 'ID inválido'),
});

export type DeleteCategoryParams = z.infer<typeof schemaDeleteCategory>;
