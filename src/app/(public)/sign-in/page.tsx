import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/headline';
import Logo from '@/components/logo';

function SignInPage() {
  return (
    <div className="grid h-screen grid-cols-2">
      <div className="bg-primary relative flex flex-col items-center justify-center p-4 text-white">
        <div className="flex max-w-lg flex-col items-center justify-center space-y-9 text-center">
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
          &#64; {new Date().getFullYear()} FinTrack. Todos os direitos
          reservados
        </p>
      </div>

      {/* FORM GRID */}
      <div className="flex flex-col items-center justify-center">
        <div className="space-y-5">
          <Logo />

          <Headline>
            <HeadlineTitle>Bem vindo de volta</HeadlineTitle>
            <HeadlineDescription>
              Favor, entre com suas credenciais para acessar sua conta.
            </HeadlineDescription>
          </Headline>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
