import { FolderOpen } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function NoResultTransactions() {
  return (
    <div className="flex min-h-[calc(100vh-164px)] flex-col items-center justify-center space-y-8">
      <Card>
        <CardContent>
          <FolderOpen className="h-10 w-10" />
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold">Sem resultados por aqui</h2>
      <p className="text-muted-foreground max-w-96 text-center text-sm">
        Não encontramos nenhuma transação ou meta com os filtros atuais. Que tal
        tentar uma busca diferente ou cadastrar uma nova conta?
      </p>

      <Button asChild className="text-center">
        <Link href="/transactions/installments">Nova transação</Link>
      </Button>
    </div>
  );
}
