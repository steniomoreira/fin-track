import { Shapes } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Headline,
  HeadlineDescription,
  HeadlineTitle,
} from '@/components/ui/headline';
import { Input } from '@/components/ui/input';
import { PageContainer } from '@/components/ui/page-container';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { COLORS_CATEGORIES } from './constants/colors-categories-constants';
import { ICONS_CATEGORIES } from './constants/icons-categories-constants';

export default async function CategoriesPage() {
  return (
    <PageContainer>
      <header className="flex items-end justify-between">
        <Headline>
          <HeadlineTitle>Gerenciamento de categorias</HeadlineTitle>
          <HeadlineDescription>
            Organize suas contas com grupos e categorias personalizadas.
          </HeadlineDescription>
        </Headline>
      </header>

      <div className="grid grid-cols-[1fr_350px] gap-6">
        <div>list categories</div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Adicionar nova categoria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Nome da categoria</FieldLabel>
                    <Input id="name" autoFocus placeholder="Ex: Eletrônicos" />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">
                      Descrição (opcional)
                    </FieldLabel>
                    <Textarea
                      id="description"
                      placeholder="Ex: Smartphones, notebooks, acessórios..."
                      className="min-h-[100px] resize-none"
                    />
                  </Field>
                </FieldGroup>
              </form>

              <h3 className="text-muted-foreground text-sm font-medium">
                Selecione um ícone
              </h3>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {ICONS_CATEGORIES.map((icon) => (
                  <Button
                    key={icon.key}
                    variant="outline"
                    className="h-12 w-12 cursor-pointer"
                  >
                    <icon.icon />
                  </Button>
                ))}
              </div>

              <h3 className="text-muted-foreground text-sm font-medium">
                Selecione uma cor
              </h3>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {COLORS_CATEGORIES.map(({ color }) => (
                  <Button
                    key={color}
                    className={`h-9 w-9 cursor-pointer rounded-full ${color} hover:${color} hover:opacity-80`}
                  />
                ))}
              </div>

              <Separator />

              <Button className="w-full">
                <Shapes />
                Criar categoria
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
