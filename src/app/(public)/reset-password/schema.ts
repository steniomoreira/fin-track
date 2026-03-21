import z from 'zod';

export const formSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
    passwordConfirmation: z
      .string()
      .trim()
      .min(8, { message: 'A senha deve conter no mínimo 8 caracteres' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não correspondem',
    path: ['passwordConfirmation'],
  });

export type FormData = z.infer<typeof formSchema>;
