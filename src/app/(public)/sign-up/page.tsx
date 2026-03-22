import FinTrack from '@/components/logos/fintrack';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';

import { SignUpForm } from './_component/sign-up-form';

function SignUpPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-end justify-center p-4 pr-25 text-white">
        <div className="flex max-w-lg flex-col items-start justify-center space-y-9 text-center">
          <FinTrack />

          <h2 className="mt-4 text-left text-6xl leading-18 font-extrabold">
            Domine seu dinheiro, domine sua vida
          </h2>
          <p className="text-left text-xl leading-8 font-light opacity-80">
            Junte-se a mais de 50.000 usuários que gerenciam suas finanças
            pessoais com facilidade. Obtenha informações em tempo real e
            ferramentas profissionais de orçamento
          </p>
        </div>

        <p className="absolute bottom-4 text-sm opacity-80">
          &#64; {new Date().getFullYear()} <strong>FinTrack</strong>. Todos os
          direitos reservados
        </p>
      </div>

      <div className="flex flex-col items-start justify-center p-4 pl-25">
        <div className="space-y-8">
          <Headline>
            <HeadlineTitle>Crie sua conta</HeadlineTitle>
            <HeadlineDescription>
              Comece hoje mesmo sua jornada rumo à liberdade financeira.
            </HeadlineDescription>
          </Headline>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
