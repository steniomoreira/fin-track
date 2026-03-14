import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/headline';
import FinTrack from '@/components/logos/fintrack';

import { LoginForm } from './_component/login-form';

function SignInPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-center justify-center p-4 text-white">
        <div className="flex max-w-lg flex-col items-center justify-center space-y-9 text-center">
          <FinTrack />

          <h2 className="text-center text-4xl font-extrabold">
            Domine suas finanças com a <br /> FinTrack
          </h2>
          <p className="text-lg opacity-80">
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

      <div className="flex flex-col items-center justify-center p-4">
        <div className="space-y-8">
          <FinTrack />

          <Headline>
            <HeadlineTitle>Bem vindo de volta</HeadlineTitle>
            <HeadlineDescription>
              Favor, entre com suas credenciais para acessar sua conta.
            </HeadlineDescription>
          </Headline>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
