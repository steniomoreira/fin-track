import z from 'zod';

import { COLOR_MAP } from '@/constants/colors-constants';
import { ICON_MAP } from '@/constants/icons-constants';

export const schemaUpsertCategory = z.object({
  id: z.cuid('ID inválido').optional(),
  name: z.string().trim().min(3, { message: 'Nome inválido' }),
  description: z.string().trim().optional(),
  icon: z.enum(Object.keys(ICON_MAP) as [string, ...string[]]),
  color: z.enum(Object.keys(COLOR_MAP) as [string, ...string[]]),
});

export type UpsertCategoryParams = z.infer<typeof schemaUpsertCategory>;
