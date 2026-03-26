export function centsToCurrency(cents: number): number {
  return cents / 100;
}

export function currencyToCents(cents: number): number {
  return cents * 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(centsToCurrency(value));
}
