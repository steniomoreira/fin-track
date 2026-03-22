import FinTrack from '@/components/logos/fintrack';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';

import { ForgotPasswordForm } from './_component/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-end justify-center p-4 pr-25 text-white">
        <div className="flex max-w-lg flex-col items-start justify-center space-y-9 text-center">
          <FinTrack />

          <h2 className="mt-4 text-left text-6xl leading-18 font-extrabold">
            Recupere seu acesso com segurança
          </h2>
          <p className="text-left text-xl font-light opacity-80">
            Nossa plataforma utiliza criptografia de ponta a ponta para garantir
            que sua jornada financeira permaneça privada e protegida em todos os
            momentos.
          </p>
        </div>

        <p className="absolute bottom-4 text-sm opacity-80">
          &#64; {new Date().getFullYear()} <strong>FinTrack</strong>. Todos os
          direitos reservados
        </p>
      </div>

      <div className="flex flex-col items-start justify-center p-4 pl-25">
        <div className="max-w-111 space-y-8">
          <Headline>
            <HeadlineTitle>Esqueceu sua senha?</HeadlineTitle>
            <HeadlineDescription>
              Não se preocupe. Digite seu e-mail cadastrado e enviaremos as
              instruções para você criar uma nova senha.
            </HeadlineDescription>
          </Headline>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
