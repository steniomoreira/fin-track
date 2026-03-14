'use client';

import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

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
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const [isShow, setIsShow] = useState(false);

  function handleShowPassword() {
    setIsShow((prev) => !prev);
  }

  return (
    <form className={cn('flex flex-col gap-6', className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoFocus
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <Link
              href="#"
              className="text-primary ml-auto text-sm font-semibold"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <InputGroup>
            <InputGroupInput
              type={isShow ? 'text' : 'password'}
              placeholder="********"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton onClick={handleShowPassword}>
                {isShow ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <Button type="submit" className="h-12">
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
