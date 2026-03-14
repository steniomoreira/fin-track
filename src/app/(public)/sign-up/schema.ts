import z from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'O nome é obrigatório')
      .refine((value) => value.split(' ').length > 1, {
        message: 'Digite nome e sobre nome.',
      }),
    email: z.email({ message: 'Digite um e-mail válido.' }),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve conter no mínimo 6 caracteres' }),
    passwordConfirmation: z
      .string()
      .trim()
      .min(6, { message: 'A senha deve conter no mínimo 6 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não correspondem',
    path: ['passwordConfirmation'],
  });

export type FormData = z.infer<typeof formSchema>;
