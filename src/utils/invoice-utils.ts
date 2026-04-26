import { utcDate } from './date-utils';

interface CalculateInvoiceDatesParams {
  baseDate: Date;
  closingDay: number;
  dueDay: number;
}

interface CalculateInvoiceDatesResult {
  closingDate: Date;
  referenceMonth: Date;
  invoiceDueDate: Date;
}

export function calculateInvoiceDates({
  baseDate,
  closingDay,
  dueDay,
}: CalculateInvoiceDatesParams): CalculateInvoiceDatesResult {
  const baseDayUTC = baseDate.getUTCDate();
  let referenceMonthUTC = baseDate.getUTCMonth();
  let referenceYearUTC = baseDate.getUTCFullYear();

  const getDaysInMonthUTC = (year: number, month: number) => {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  };

  let currentClosingDay = Math.min(
    closingDay,
    getDaysInMonthUTC(referenceYearUTC, referenceMonthUTC)
  );

  let closingDate = new Date(
    Date.UTC(referenceYearUTC, referenceMonthUTC, currentClosingDay)
  );

  if (baseDayUTC > currentClosingDay) {
    referenceMonthUTC += 1;
    if (referenceMonthUTC > 11) {
      referenceMonthUTC = 0;
      referenceYearUTC += 1;
    }
    currentClosingDay = Math.min(
      closingDay,
      getDaysInMonthUTC(referenceYearUTC, referenceMonthUTC)
    );
    closingDate = new Date(
      Date.UTC(referenceYearUTC, referenceMonthUTC, currentClosingDay)
    );
  }

  const referenceMonth = new Date(
    Date.UTC(referenceYearUTC, referenceMonthUTC, 1)
  );

  let currentDueDay = Math.min(
    dueDay,
    getDaysInMonthUTC(referenceYearUTC, referenceMonthUTC)
  );

  let invoiceDueDate = new Date(
    Date.UTC(referenceYearUTC, referenceMonthUTC, currentDueDay)
  );

  if (dueDay < closingDay) {
    let dueMonthUTC = referenceMonthUTC + 1;
    let dueYearUTC = referenceYearUTC;

    if (dueMonthUTC > 11) {
      dueMonthUTC = 0;
      dueYearUTC += 1;
    }
    currentDueDay = Math.min(
      dueDay,
      getDaysInMonthUTC(dueYearUTC, dueMonthUTC)
    );
    invoiceDueDate = new Date(Date.UTC(dueYearUTC, dueMonthUTC, currentDueDay));
  }

  return { closingDate, referenceMonth, invoiceDueDate };
}

export function checkIsInvoiceClosed(
  dueDate: Date,
  closingDay: number
): boolean {
  const today = new Date();
  const todayUTC = utcDate(today);
  todayUTC.setUTCHours(0, 0, 0, 0);

  const due = new Date(dueDate);

  let closingMonth = due.getUTCMonth();
  let closingYear = due.getUTCFullYear();

  if (closingDay > due.getUTCDate()) {
    closingMonth -= 1;
    if (closingMonth < 0) {
      closingMonth = 11;
      closingYear -= 1;
    }
  }

  const closingDate = new Date(Date.UTC(closingYear, closingMonth, closingDay));

  return todayUTC >= closingDate && todayUTC < due;
}
