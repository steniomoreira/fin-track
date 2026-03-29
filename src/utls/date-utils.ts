import { endOfMonth, format, isValid, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function date_dd_MMM_yyyy(date: Date) {
  return format(date, 'dd MMM, yyyy', { locale: ptBR });
}

export function date_MMMM_yyyy(date: Date) {
  return format(date, 'MMMM, yyyy', { locale: ptBR });
}

export function getMonthByDate(date?: Date) {
  const today = new Date(`${format(new Date(), 'yyyy-MM-dd')}T00:00:00`);
  const dateParam = new Date(`${date}T00:00:00`);

  if (isValid(dateParam)) {
    return {
      firstDay: startOfMonth(dateParam),
      lastDay: endOfMonth(dateParam),
    };
  }

  return { firstDay: startOfMonth(today), lastDay: endOfMonth(today) };
}
