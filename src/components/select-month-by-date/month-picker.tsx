'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type Month = {
  number: number;
  name: string;
};

const MONTHS: Month[][] = [
  [
    { number: 0, name: 'Jan' },
    { number: 1, name: 'Fer' },
    { number: 2, name: 'Mar' },
    { number: 3, name: 'Abr' },
  ],
  [
    { number: 4, name: 'Mai' },
    { number: 5, name: 'Jun' },
    { number: 6, name: 'Jul' },
    { number: 7, name: 'Ago' },
  ],
  [
    { number: 8, name: 'Set' },
    { number: 9, name: 'Out' },
    { number: 10, name: 'Nov' },
    { number: 11, name: 'Dez' },
  ],
];

type MonthPicker = {
  selectedMonth: Date;
  onSelectMonth: (month: Date) => void;
};

export function MonthPicker({ selectedMonth, onSelectMonth }: MonthPicker) {
  const [year, setYear] = useState<number>(
    selectedMonth?.getFullYear() ?? new Date().getFullYear()
  );

  function onYearForward() {
    setYear((prevState) => prevState + 1);
  }

  function onYearBackward() {
    setYear((prevState) => prevState - 1);
  }

  function handleOnClick(month: Month) {
    onSelectMonth(new Date(year, month.number, 1));
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-center pt-1">
        <div className="flex items-center gap-6">
          <Button variant="outline" onClick={onYearBackward}>
            <ChevronLeft className="h-4 w-4 opacity-50" />
          </Button>
          <div className="text-sm font-medium">{year}</div>
          <Button variant="outline" onClick={onYearForward}>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </Button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <tbody>
          {MONTHS.map((monthRow, i) => {
            return (
              <tr key={'row-' + i} className="w-full">
                {monthRow.map((month) => {
                  return (
                    <td key={month.number} className="p-1">
                      <Button
                        className="w-12.5"
                        variant={
                          selectedMonth?.getMonth() === month.number
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => handleOnClick(month)}
                      >
                        {month.name}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
