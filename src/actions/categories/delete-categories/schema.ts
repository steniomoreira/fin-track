import { z } from 'zod';

export const schemaDeleteCategory = z.object({
  id: z.cuid('ID inválido'),
});

export type DeleteCategoryParams = z.infer<typeof schemaDeleteCategory>;
