'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { toast } from 'sonner';

import { upsertCreditCard } from '@/actions/credit-cards/upsert-credit-card';
import { ColorPicker } from '@/app/(protected)/_components/color-picker';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from '@/types/credit-cards/credit-card';
import { centsToCurrency } from '@/utils/currency-utils';
import { toastMessage, toastTypes } from '@/utils/toast-utils';

import { schemaUpsertCreditCardForm, UpsertCreditCardFormData } from './schema';

interface UpsertCreditCardFormProps {
  creditCard?: CreditCard;
  onClose: () => void;
}

export function UpsertCreditCardForm({
  creditCard,
  onClose,
}: UpsertCreditCardFormProps) {
  const form = useForm<UpsertCreditCardFormData>({
    resolver: zodResolver(schemaUpsertCreditCardForm),
    defaultValues: {
      name: creditCard?.name ?? '',
      lastFourDigits: creditCard?.lastFourDigits ?? '',
      color: creditCard?.color ?? 'black',
      closingDay: creditCard?.closingDay ?? 31,
      dueDay: creditCard?.dueDay ?? 8,
      limit: creditCard?.limit ? centsToCurrency(creditCard.limit) : undefined,
    },
  });

  async function onSubmit(data: UpsertCreditCardFormData) {
    try {
      const response = await upsertCreditCard({ ...data, id: creditCard?.id });

      toastMessage({ type: response.type, message: response.message });

      if (response.type === toastTypes.SUCCESS) {
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Ocorreu um erro no processo de ${creditCard ? 'atualização' : 'criação'} do cartão!`
      );
    }
  }

  const isLoading = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                {...field}
                id="name"
                autoFocus
                placeholder="Ex: Nubank"
                disabled={isLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="lastFourDigits"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="lastFourDigits">
                Número do cartão (4 últimos dígitos)
              </FieldLabel>

              <div className="relative flex items-center">
                <span className="text-muted-foreground absolute pl-2.5">
                  **** **** ****
                </span>
                <PatternFormat
                  className="pl-[108px]"
                  id="lastFourDigits"
                  format="####"
                  customInput={Input}
                  placeholder="Ex: 1234"
                  disabled={isLoading}
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.value);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="grid grid-cols-2 gap-6">
          <Controller
            name="closingDay"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="closingDay">Dia de fechamento</FieldLabel>
                <Input
                  id="closingDay"
                  type="number"
                  min={1}
                  max={31}
                  {...field}
                  onChange={(e) => {
                    const raw = e.target.valueAsNumber;

                    if (raw) {
                      field.onChange(raw);
                    }
                  }}
                  disabled={isLoading}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="dueDay"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="dueDay">Dia de vencimento</FieldLabel>
                <Input
                  id="dueDay"
                  type="number"
                  min={1}
                  max={31}
                  {...field}
                  onChange={(e) => {
                    const raw = e.target.valueAsNumber;

                    if (raw) {
                      field.onChange(raw);
                    }
                  }}
                  disabled={isLoading}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="limit"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="limit">
                R$ Limite do cartão (opcional)
              </FieldLabel>
              <NumericFormat
                id="limit"
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
                placeholder="Ex: 5.000,00"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="color"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Selecione uma cor</FieldLabel>
              <ColorPicker
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                {creditCard ? 'Atualizando...' : 'Adicionando...'}
              </>
            ) : (
              <>
                <Plus />
                {creditCard ? 'Atualizar' : 'Adicionar'}
              </>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
