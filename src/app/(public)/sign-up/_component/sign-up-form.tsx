'use client';

import { LockKeyhole, RotateCcwKey } from 'lucide-react';
import Link from 'next/link';

import Google from '@/components/logos/google';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
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
import { cn } from '@/lib/utils';

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <div className="flex items-center justify-between gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">Nome</FieldLabel>
            <Input id="firstName" type="firstName" required autoFocus />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Sobre nome</FieldLabel>
            <Input id="lastName" type="lastName" required />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="password"
              type="password"
              placeholder="********"
            />
            <InputGroupAddon>
              <LockKeyhole />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirmar senha</FieldLabel>

          <InputGroup>
            <InputGroupInput
              id="confirmPassword"
              type="password"
              placeholder="********"
            />
            <InputGroupAddon>
              <RotateCcwKey />
            </InputGroupAddon>
          </InputGroup>
        </Field>
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
