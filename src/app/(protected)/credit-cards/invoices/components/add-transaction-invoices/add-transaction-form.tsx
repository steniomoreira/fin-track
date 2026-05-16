'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader, RefreshCcwDot } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { addTransactionInvoice } from '@/actions/invoices/add-transactions-invoice';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
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
import { EXPENSE, transactionTypes } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { Category } from '@/types/categories/category';
import { Invoice } from '@/types/invoices/invoice';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';
import { toastMessage, toastTypes } from '@/utils/toast-utils';

import { AddTransactionFormData, schemaAddTransactionForm } from './schema';

interface AddTransactionFormProps {
  invoice: Invoice;
  categories: Category[];
  onClose: () => void;
}

export function AddTransactionForm({
  invoice,
  categories,
  onClose,
}: AddTransactionFormProps) {
  const schema = schemaAddTransactionForm({
    closingDay: invoice.creditCard.closingDay,
    referenceMonth: new Date(invoice.referenceMonth),
  });

  const form = useForm<AddTransactionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: '',
      dueDate: new Date(new Date().setHours(0, 0, 0, 0)),
      amount: 0,
      type: EXPENSE,
    },
  });

  async function onSubmit(data: AddTransactionFormData) {
    try {
      const response = await addTransactionInvoice({
        ...data,
        creditCardId: invoice.creditCard.id,
      });

      toastMessage({ type: response.type, message: response.message });

      if (response.type === toastTypes.SUCCESS) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de criação do lançamento!');
    }
  }

  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Adicionar lançamento</DialogTitle>
        <DialogDescription>
          Preencha o formulário abaixo para adicionar um lançamento na fatura
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
                  disabled={isLoading}
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
                      disabled={isLoading}
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
                      defaultMonth={field.value}
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
                  disabled={isLoading}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Tipo de lançamento</FieldLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  disabled={isLoading}
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
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Qual categoria?" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
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

          <Separator />

          <div className="flex items-center justify-end gap-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isLoading}
            >
              Descartar
            </Button>

            <Button className="md:w-40" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="animate-spin" />
                  Adicionando...
                </>
              ) : (
                <>
                  <RefreshCcwDot />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
