'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { resetPassword } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

import { FormData, formSchema } from '../schema';

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordConfirm, setIsShowPasswordConfirm] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  if (!token) {
    redirect('/sign-in');
  }

  async function onSubmit({ password }: FormData) {
    const { error, data } = await resetPassword({
      newPassword: password,
      token,
    });

    if (data?.status) {
      toast.success('Senha atualizada com sucesso!');
      redirect('/sign-in');
    }

    if (error) {
      toast.error('Ocorreu um erro. Não foi possível redefinir sua senha');
      console.error(error.message);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="password">Nova senha</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="password"
                  type={isShowPassword ? 'text' : 'password'}
                  placeholder="********"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => setIsShowPassword((prev) => !prev)}
                  >
                    {isShowPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
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
                Confirmar nova senha
              </FieldLabel>

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="passwordConfirmation"
                  type={isShowPasswordConfirm ? 'text' : 'password'}
                  placeholder="********"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={() => setIsShowPasswordConfirm((prev) => !prev)}
                  >
                    {isShowPasswordConfirm ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type="submit" className="h-12">
            Salvar e Acessar
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-1 h-2 w-2 animate-spin" />
            ) : (
              <ArrowRight className="mr-1 h-2 w-2" />
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
