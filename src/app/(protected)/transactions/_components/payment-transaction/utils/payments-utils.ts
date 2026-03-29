export function getTotalPaid(payments: { amount: number }[]) {
    return payments.reduce<number>((sum, payment) => sum + payment.amount, 0);
}
