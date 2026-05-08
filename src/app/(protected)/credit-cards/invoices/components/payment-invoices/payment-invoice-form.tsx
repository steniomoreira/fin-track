'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import { BanknoteArrowUp, CalendarIcon, Loader } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { paymentInvoice } from '@/actions/invoices/payment-invoice';
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
import { invoiceStatus } from '@/constants/invoices-constants';
import { cn } from '@/lib/utils';
import { Invoice } from '@/types/invoices/invoice';
import { centsToCurrency } from '@/utils/currency-utils';
import { date_dd_MMM_yyyy } from '@/utils/date-utils';
import { toastMessage, toastTypes } from '@/utils/toast-utils';

import { PaymentInvoiceFormData, schemaPaymentInvoiceForm } from './schema';

interface PaymentInvoiceFormProps {
  invoice: Invoice;
  onClose: () => void;
}

export function PaymentInvoiceForm({
  invoice,
  onClose,
}: PaymentInvoiceFormProps) {
  const currentyAmount = centsToCurrency(
    invoice.totalAmount - invoice.paidAmount
  );

  const form = useForm<PaymentInvoiceFormData>({
    resolver: zodResolver(schemaPaymentInvoiceForm(currentyAmount)),
    defaultValues: {
      date: new Date(),
      paymentAmount: currentyAmount,
    },
  });

  async function onSubmit(data: PaymentInvoiceFormData) {
    try {
      const isFullyPaid =
        data.paymentAmount + invoice.paidAmount === invoice.totalAmount;

      const resolveStatus = (paid: boolean) =>
        paid ? invoiceStatus.PAID : invoiceStatus.PARTIAL;

      const paymentStatus = resolveStatus(isFullyPaid);
      const paymentPayload = {
        date: data.date,
        amount: data.paymentAmount,
        status: paymentStatus,
      };
      const response = await paymentInvoice({
        invoiceId: invoice.id,
        ...paymentPayload,
      });
      if (response.type === toastTypes.SUCCESS) {
        onClose();
      }
      toastMessage({ type: response.type, message: response.message });
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de pagamento!');
    }
  }

  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  return (
    <>
      <DialogHeader>
        <DialogTitle>Efetuar baixa</DialogTitle>
        <DialogDescription>
          Informe a data e o valor que deseja efetuar a baixa
        </DialogDescription>
      </DialogHeader>

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                        'h-12 pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      disabled={isLoading}
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
          <div className="flex items-end gap-2">
            <Controller
              control={form.control}
              name="paymentAmount"
              render={({ field, fieldState }) => (
                <Field className="flex-1">
                  <FieldLabel>{`Valor a pagar`}</FieldLabel>
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
                    disabled={isLoading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                <BanknoteArrowUp />
              )}
              {'Pagar'}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
