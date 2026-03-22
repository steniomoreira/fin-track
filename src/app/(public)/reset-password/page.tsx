import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import FinTrack from '@/components/logos/fintrack';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';

import { ResetPasswordForm } from './_components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-end justify-center p-4 pr-25 text-white">
        <div className="flex max-w-lg flex-col items-start justify-center space-y-9 text-center">
          <FinTrack />

          <h2 className="mt-4 text-left text-6xl leading-18 font-extrabold">
            Proteção de dados de alto nível
          </h2>
          <p className="text-left text-xl leading-8 font-light opacity-80">
            Utilizamos criptografia de ponta a ponta para garantir que suas
            transações e dados pessoais permaneçam privados e seguros.
          </p>
        </div>

        <p className="absolute bottom-4 text-sm opacity-80">
          &#64; {new Date().getFullYear()} <strong>FinTrack</strong>. Todos os
          direitos reservados
        </p>
      </div>

      <div className="flex flex-col items-start justify-center p-4 pl-25">
        <div className="space-y-8">
          <Link
            href="/sign-in"
            className="text-muted-foreground flex items-center text-sm font-semibold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao sign In
          </Link>

          <Headline>
            <HeadlineTitle>Redefinir seu senha</HeadlineTitle>
            <HeadlineDescription>
              Sua segurança é nossa prioridade. Escolha uma senha forte.
            </HeadlineDescription>
          </Headline>

          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
