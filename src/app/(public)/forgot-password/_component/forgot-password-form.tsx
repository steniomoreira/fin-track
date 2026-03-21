'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Loader2, Mail } from 'lucide-react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';

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
import { cn } from '@/lib/utils';

import { FormData, formSchema } from '../schema';

export function ForgoPasswordForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: FormData) {
    console.log(data);
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

              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <InputGroupAddon>
                  <InputGroupButton>
                    <Mail />
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
            Enviar link de recuperação
            {form.formState.isSubmitting ? (
              <Loader2 className="mr-1 h-2 w-2 animate-spin" />
            ) : (
              <ArrowRight className="mr-1 h-2 w-2" />
            )}
          </Button>
        </Field>
      </FieldGroup>

      <Link
        href="/sign-in"
        className="text-primary m-auto flex items-center text-sm font-semibold"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o sign In
      </Link>
    </form>
  );
}
