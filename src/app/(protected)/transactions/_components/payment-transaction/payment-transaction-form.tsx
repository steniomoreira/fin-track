'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import { BanknoteArrowUp, CalendarIcon, Loader } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { paymentTransaction } from '@/actions/transactions/payment-transaction';
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
import { INCOME, status } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { InstallmentTransaction } from '@/types/installment-transaction-types';
import { centsToCurrency } from '@/utls/currency-utils';
import { date_dd_MMM_yyyy } from '@/utls/date-utils';
import { toastMessage } from '@/utls/toast-utils';

import {
  PaymentTransactionFormData,
  schemaPaymentTransactionForm,
} from './schema';
import { getTotalPaid } from './utils/payments-utils';

interface PaymentTransactionProps {
  installment: InstallmentTransaction;
  onClose: () => void;
}

export function PaymentTransactionForm({
  installment,
  onClose,
}: PaymentTransactionProps) {
  const currentyAmount = centsToCurrency(
    installment.amount - getTotalPaid(installment.payments)
  );

  const form = useForm<PaymentTransactionFormData>({
    resolver: zodResolver(schemaPaymentTransactionForm(currentyAmount)),
    shouldUnregister: true,
    defaultValues: {
      date: new Date(),
      paymentAmount: currentyAmount,
    },
  });

  useEffect(() => {
    form.setValue('paymentAmount', currentyAmount);
  }, [currentyAmount, form]);

  async function onSubmit(data: PaymentTransactionFormData) {
    try {
      const response = await paymentTransaction({
        installmentId: installment.id,
        date: data.date,
        amount: data.paymentAmount,
        status:
          data.paymentAmount + getTotalPaid(installment.payments) ===
          installment.amount
            ? status.PAID
            : status.PARTIAL,
      });

      toastMessage({ type: response.type, message: response.message });
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de pagamento!');
    } finally {
      onClose();
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  const isIncome = installment.transaction.type === INCOME;

  return (
    <DialogContent className="sm:max-w-106.25">
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>Efetuar baixa</DialogTitle>
          <DialogDescription>
            Informe a data e o valor que deseja efetuar a baixa
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Controller
            control={form.control}
            name="date"
            render={({ field, fieldState }) => (
              <Field className="flex flex-col">
                <FieldLabel>Data de quitação</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
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
                      defaultMonth={installment.dueDate}
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
          <div className="flex items-end gap-2">
            <Controller
              control={form.control}
              name="paymentAmount"
              render={({ field, fieldState }) => (
                <Field className="flex-1">
                  <FieldLabel>{`Valor a ${isIncome ? 'receber' : 'pagar'}`}</FieldLabel>
                  <NumericFormat
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
                    disabled={isSubmitting}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin" />
              ) : (
                <BanknoteArrowUp />
              )}
              {isIncome ? 'Receber' : 'Pagar'}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </DialogContent>
  );
}
