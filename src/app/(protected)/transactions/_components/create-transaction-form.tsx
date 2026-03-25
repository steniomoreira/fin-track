'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import {
  ArrowRight,
  CalendarIcon,
  FileText,
  Loader2,
  Trash2,
} from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EXPENSE, transactionTypes } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';

import { schemaCreateTransactionForm, TransactionFormData } from '../schemas';

export function CreateTransactionForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(schemaCreateTransactionForm),
    defaultValues: {
      description: '',
      dueDate: new Date(),
      type: EXPENSE,
      amount: 0,
      numberInstallments: 1,
      installmentGroup: false,
      creditCardId: '',
    },
  });

  async function onSubmit(data: TransactionFormData) {
    console.log(data);
  }

  function resetCreditCard() {
    form.setValue('creditCardId', '');
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex w-full max-w-207.5 flex-col gap-6', className)}
      {...props}
    >
      <Card className="gap-0 p-0">
        <CardHeader className="border-b p-6">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <FileText className="text-primary" />
            Detalhes Gerais
          </CardTitle>
        </CardHeader>
        <CardDescription className="p-8">
          <FieldGroup>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="description">Descrição</FieldLabel>
                  <Input
                    {...field}
                    id="description"
                    autoFocus
                    placeholder="Ex: Assinatura Streaming Mensal"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Tipo de lançamento</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {transactionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Categoria</FieldLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Qual categoria?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cmhih36gs0000fgqcb19a6i4o">
                          Habitação
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Controller
                name="dueDate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Data</FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'h-12 pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                          disabled={isSubmitting}
                        >
                          {date_dd_MMM_yyyy(field.value)}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          locale={ptBR}
                          showOutsideDays={false}
                          required
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="creditCardId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Vincular Cartão de crédito</FieldLabel>

                    <div className="flex items-center gap-2">
                      <Select
                        value={field.value ?? undefined}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Qual cartão de crédito?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cmhih550u0001fgqcfxz2b6sv">
                            Nubank
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={resetCreditCard}
                        disabled={!field.value}
                      >
                        <Trash2 className="text-red-900" />
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </CardDescription>
      </Card>

      <Card className="gap-0 p-0">
        <CardHeader className="border-b p-6">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            Lançamento
          </CardTitle>
        </CardHeader>
        <CardDescription className="p-8">
          <div className="grid grid-cols-2 gap-6">
            <FieldGroup>
              <div className="grid grid-cols-[1fr_150] gap-6">
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="amount">R$ Valor</FieldLabel>
                      <NumericFormat
                        id="amount"
                        value={field.value}
                        onValueChange={(value) =>
                          field.onChange(value.floatValue)
                        }
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        prefix="R$ "
                        allowNegative={false}
                        allowLeadingZeros={false}
                        customInput={Input}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="numberInstallments"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel htmlFor="numberInstallments">
                        Número de parcelas
                      </FieldLabel>
                      <Input
                        id="numberInstallments"
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        disabled={isSubmitting}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="installmentGroup"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="installmentGroup"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                      <FieldLabel htmlFor="installmentGroup">
                        Exibir o contador das parcelas. &#40;ex: 1/10&#41;
                      </FieldLabel>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase opacity-20">
                  Resumo do lançamento
                </CardTitle>
                <CardContent className="p-0">
                  <table className="w-full">
                    <tbody>
                      <tr className="text-muted-foreground">
                        <td>Total da compra</td>
                        <td className="py-1 text-right font-semibold">
                          R$ 1.200,00
                        </td>
                      </tr>
                      <tr className="text-muted-foreground">
                        <td>Parcelamento</td>
                        <td className="text-primary py-1 text-right font-bold">
                          10x de R$ 120,00
                        </td>
                      </tr>
                      <tr className="text-muted-foreground">
                        <td>Dia de vencimento</td>
                        <td className="py-1 text-right font-semibold">10</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </CardHeader>
            </Card>
          </div>
        </CardDescription>
      </Card>

      <div className="flex items-center justify-end gap-6">
        <Button type="button" variant="ghost">
          Descartar
        </Button>

        <Button type="submit" className="">
          Finalizar lançamento
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-1 h-2 w-2 animate-spin" />
          ) : (
            <ArrowRight className="mr-1 h-2 w-2" />
          )}
        </Button>
      </div>
    </form>
  );
}
