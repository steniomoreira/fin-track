import { getDate } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { currencyToCents, formatCurrency } from '@/utls/currency-utils';

export function InstallmentForm() {
  const form = useFormContext();

  const isSubmitting = form.formState.isSubmitting;

  return (
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
                  onChange={(e) => {
                    const raw = e.target.valueAsNumber;

                    if (raw) {
                      field.onChange(raw);
                    }
                  }}
                  disabled={isSubmitting}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  <td>Valor total</td>
                  <td className="py-1 text-right font-semibold">
                    {formatCurrency(
                      currencyToCents(
                        form.watch('amount') * form.watch('numberInstallments')
                      )
                    )}
                  </td>
                </tr>
                <tr className="text-muted-foreground">
                  <td>Plano de contas</td>
                  <td className="text-primary py-1 text-right font-bold">
                    {form.watch('numberInstallments')}x de{' '}
                    {formatCurrency(currencyToCents(form.watch('amount')))}
                  </td>
                </tr>
                <tr className="text-muted-foreground">
                  <td>Dia de vencimento</td>
                  <td className="py-1 text-right font-semibold">
                    {getDate(form.watch('dueDate'))}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
