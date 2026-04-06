'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader, Plus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'sonner';

import { upsertCreditCard } from '@/actions/credit-cards/upsert-credit-card';
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
      cardNumber: creditCard?.cardNumber ?? '',
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
      toast.error('Ocorreu um erro no processo de criação!');
    }
  }

  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful;

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
          name="cardNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="cardNumber">Número do cartão</FieldLabel>
              <PatternFormat
                id="cardNumber"
                format="#### #### #### ####"
                customInput={Input}
                placeholder="Ex: 1234 5678 9012 3456"
                disabled={isLoading}
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.value);
                }}
                onBlur={field.onBlur}
                name={field.name}
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
