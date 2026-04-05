'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader, RefreshCcwDot, Trash2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { updateInstallments } from '@/actions/transactions/update-transaction';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { Separator } from '@/components/ui/separator';
import { status, transactionTypes } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { Installment } from '@/types/transactions/installment';
import { centsToCurrency } from '@/utls/currency-utils';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';
import { toastMessage } from '@/utls/toast-utils';

import {
  schemaUpdateTransactionForm,
  UpdateTransactionFormData,
} from './schema';

interface UpdateTransactionFormProps {
  installment: Installment;
  onClose: () => void;
}

export function UpdateTransactionForm({
  installment,
  onClose,
}: UpdateTransactionFormProps) {
  const form = useForm<UpdateTransactionFormData>({
    resolver: zodResolver(schemaUpdateTransactionForm),
    shouldUnregister: true,
    defaultValues: {
      description: installment.transaction.description,
      amount: centsToCurrency(installment.amount),
      dueDate: installment.dueDate,
      type: installment.transaction.type,
      creditCardId: installment.transaction.creditCard?.id || '',
      categoryId: installment.transaction.category.id,
    },
  });

  async function onSubmit(data: UpdateTransactionFormData) {
    try {
      const response = await updateInstallments({
        ...data,
        id: installment.id,
        transactionId: installment.transaction.id,
        creditCardId: data.creditCardId || null,
      });

      const { type, message } = response;
      toastMessage({ type, message });
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de atualização!');
    } finally {
      onClose();
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  function resetCreditCard() {
    form.setValue('creditCardId', '');
  }

  const hasPaid =
    installment.status === status.PAID || installment.status === status.PARTIAL;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Atualizar lançamento</DialogTitle>
        <DialogDescription>
          Atualize os campos que deseja modificar de{' '}
          <span className="font-bold capitalize">
            {installment.transaction.description}
          </span>
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      disabled={isSubmitting || hasPaid}
                    >
                      {date_dd_MMM_yyyy(field.value || new Date())}
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
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="amount">R$ Valor</FieldLabel>
                <NumericFormat
                  id="amount"
                  value={field.value}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  prefix="R$ "
                  allowNegative={false}
                  allowLeadingZeros={false}
                  customInput={Input}
                  disabled={isSubmitting || hasPaid}
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
                    className="h-12 w-12"
                    type="button"
                    variant="destructive"
                    onClick={resetCreditCard}
                    disabled={!field.value}
                  >
                    <Trash2 />
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Separator />

          <div className="flex items-center justify-end gap-6">
            <Button type="button" variant="ghost" onClick={onClose}>
              Descartar
            </Button>

            <Button className="md:w-40" type="submit">
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  atualizando...
                </>
              ) : (
                <>
                  <RefreshCcwDot />
                  Atualizar
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </DialogContent>
  );
}
