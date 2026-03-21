import z from 'zod';

export const formSchema = z.object({
  email: z.email({ message: 'Digite um E-mail válido.' }),
});

export type FormData = z.infer<typeof formSchema>;
