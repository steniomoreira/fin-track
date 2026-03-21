'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { FormData, formSchema } from '../schema';

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  function handleShowPassword() {
    setIsShow((prev) => !prev);
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormData) {
    const { email, password } = data;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: () => {
          toast.error('Dados inválidos');
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
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Link
                  href="/forgot-password"
                  className="text-primary ml-auto text-sm font-semibold"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={isShow ? 'text' : 'password'}
                  placeholder="********"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton onClick={handleShowPassword}>
                    {isShow ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button
            type="submit"
            className="h-12"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-1 h-2 w-2 animate-spin" />
            ) : (
              <LogIn className="mr-1 h-2 w-2" />
            )}
            Entrar
          </Button>
        </Field>

        <FieldSeparator>Ou continue com</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" className="h-12">
            <Google />
            Google
          </Button>

          <FieldDescription className="text-center">
            Não tem uma conta?{' '}
            <Link href="/sign-up" className="text-primary">
              Criar uma conta
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
