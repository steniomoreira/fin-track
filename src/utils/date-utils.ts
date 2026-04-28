import { format, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { MonthRange } from '@/types/month-range';

export function utcDate(date: Date): Date {
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
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    firstDay: new Date(Date.UTC(year, month, 1, 0, 0, 0, 0)),
    lastDay: new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999)),
  };
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

export function checkIsLate(dueDate: Date | null | undefined): boolean {
  if (!dueDate) return false;

  const todayUTC = utcDate(new Date());
  const due = new Date(dueDate);

  todayUTC.setUTCHours(0, 0, 0, 0);
  due.setUTCHours(0, 0, 0, 0);

  return todayUTC > due;
}
