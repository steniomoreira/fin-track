'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Calendar, FileText, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { createTransaction } from '@/actions/transactions/create-transaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXPENSE } from '@/constants/transactions-contants';
import { cn } from '@/lib/utils';
import { toastMessage } from '@/utls/toast-utils';

import { GeneralDetailsForm } from './general-details-form';
import { InstallmentForm } from './installment-form';
import { schemaCreateTransactionForm, TransactionFormData } from './schemas';

export function CreateTransactionForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();

  const routerBack = () => {
    router.back();
  };

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
    try {
      const response = await createTransaction({
        ...data,
        creditCardId: data.creditCardId || null,
      });

      toastMessage({ type: response.type, message: response.message });
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro no processo de criação!');
    } finally {
      routerBack();
    }
  }

  return (
    <FormProvider {...form}>
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
          <CardContent className="p-8">
            <GeneralDetailsForm />
          </CardContent>
        </Card>

        <Card className="gap-0 p-0">
          <CardHeader className="border-b p-6">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <Calendar className="text-primary" />
              Lançamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <InstallmentForm />
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-6">
          <Button type="button" variant="ghost" onClick={routerBack}>
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
    </FormProvider>
  );
}
