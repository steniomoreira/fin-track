import { toast } from 'sonner';

export const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export type ToastTypes = 'success' | 'error' | 'info' | 'warning';

interface AlertMessage {
  type: ToastTypes;
  message: string;
}

export function toastMessage({ type, message }: AlertMessage) {
  toast[type](message);
}
