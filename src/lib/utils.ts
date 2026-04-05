import { type ClassValue,clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCreditCardNumber(cardNumber: string) {
  const formatted = cardNumber.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  return formatted || cardNumber;
}
