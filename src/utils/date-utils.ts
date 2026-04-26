import { endOfMonth, format, isValid, parse, startOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MonthRange } from '@/types/month-range';

function utcDate(date: Date): Date {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60_000);
}

export function date_dd_MMM_yyyy(date: Date) {
  return format(utcDate(date), 'dd MMM, yyyy', { locale: ptBR });
}

export function date_dd_MMMM_yyyy(date: Date) {
  return format(utcDate(date), "dd 'de' MMMM, yyyy", { locale: ptBR });
}

export function date_MMMM_yyyy(date: Date) {
  return format(utcDate(date), 'MMMM, yyyy', { locale: ptBR });
}

function toMonthRange(date: Date): MonthRange {
  return { firstDay: startOfMonth(date), lastDay: endOfMonth(date) };
}

export function getMonthByDate(date?: Date | string | MonthRange): MonthRange {
  if (!date) return toMonthRange(new Date());

  if (date instanceof Date) return toMonthRange(date);

  if (typeof date === 'string') {
    const fmt = /^\d{4}-\d{2}$/.test(date) ? 'yyyy-MM' : 'yyyy-MM-dd';
    const parsed = parse(date, fmt, new Date());

    return isValid(parsed) ? toMonthRange(parsed) : toMonthRange(new Date());
  }

  return date;
}
