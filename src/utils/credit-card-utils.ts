export function formatCreditCardNumber(cardNumber: string) {
  const formatted = cardNumber.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted || cardNumber;
}
