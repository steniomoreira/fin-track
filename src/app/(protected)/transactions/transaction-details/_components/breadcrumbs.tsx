import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export function Breadcrumbs() {
  const router = useRouter();

  return (
    <ul className="flex items-center gap-2 text-sm">
      <li className="opacity-50">
        <Button
          variant="link"
          className="text-foreground p-0 no-underline hover:no-underline"
          onClick={() => router.back()}
        >
          Transações
        </Button>
      </li>
      <li className="opacity-50">&#62;</li>
      <li>Detalhes da transação</li>
    </ul>
  );
}
