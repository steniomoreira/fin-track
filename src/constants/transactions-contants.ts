export const INCOME = 'INCOME' as const;
export const EXPENSE = 'EXPENSE' as const;

export const transactionTypes = [
  { value: INCOME, label: 'Receita' },
  { value: EXPENSE, label: 'Despesa' },
] as const;

export const status = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  PARTIAL: 'PARTIAL',
} as const;
