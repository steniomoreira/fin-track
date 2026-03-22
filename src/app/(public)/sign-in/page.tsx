import FinTrack from '@/components/logos/fintrack';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';

import { SignInForm } from './_component/sign-in-form';

function SignInPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-end justify-center p-4 pr-25 text-white">
        <div className="flex max-w-lg flex-col items-start justify-center space-y-9 text-center">
          <FinTrack />

          <h2 className="mt-4 text-left text-6xl leading-18 font-extrabold">
            Domine suas finanças com a FinTrack
          </h2>
          <p className="text-left text-xl font-light opacity-80">
            Junte-se a milhares de usuários que transformaram seu futuro
            financeiro usando nossas ferramentas intuitivas de acompanhamento e
            definição de metas
          </p>
        </div>

        <p className="absolute bottom-4 text-sm opacity-80">
          &#64; {new Date().getFullYear()} <strong>FinTrack</strong>. Todos os
          direitos reservados
        </p>
      </div>

      <div className="flex flex-col items-start justify-center p-4 pl-25">
        <div className="space-y-8">
          <FinTrack />

          <Headline>
            <HeadlineTitle>Bem vindo de volta</HeadlineTitle>
            <HeadlineDescription>
              Favor, entre com suas credenciais para acessar sua conta.
            </HeadlineDescription>
          </Headline>

          <SignInForm />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
