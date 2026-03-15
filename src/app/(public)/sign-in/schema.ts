import z from 'zod';

export const formSchema = z.object({
  email: z.email({ message: 'Digite um E-mail válido.' }),
  password: z
    .string()
    .trim()
    .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
});

export type FormData = z.infer<typeof formSchema>;
