'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, RotateCcwKey } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import Google from '@/components/logos/google';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { FormData, formSchema } from '../schema';

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  async function onSubmit(data: FormData) {
    const { name, email, password } = data;
    await authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input {...field} id="name" autoFocus />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="password"
                  type="password"
                  placeholder="********"
                />
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="passwordConfirmation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="passwordConfirmation">
                Confirmar senha
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="passwordConfirmation"
                  type="password"
                  placeholder="********"
                />
                <InputGroupAddon>
                  <RotateCcwKey />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="h-12">
            Entrar
          </Button>
        </Field>
        <FieldSeparator>Ou cadastrar com</FieldSeparator>
        <Field>
          <Button variant="outline" type="button" className="h-12">
            <Google />
            Google
          </Button>

          <FieldDescription className="text-center">
            Já tem uma conta?{' '}
            <Link href="/sign-in" className="text-primary">
              Entrar aqui
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
