import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Trash2 } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { transactionTypes } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';

export function GeneralDetailsForm() {
  const form = useFormContext();

  const isSubmitting = form.formState.isSubmitting;

  function resetCreditCard() {
    form.setValue('creditCardId', '');
  }

  return (
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
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
    </FieldGroup>
  );
}
