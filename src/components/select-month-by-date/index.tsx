'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { date_MMMM_yyyy } from '@/utils/date-utils';

import { MonthPicker } from './month-picker';

interface SelectMonthProps {
  date: Date;
  variant?:
    | 'default'
    | 'link'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | null
    | undefined;
}

export function SelectMonthByDate({
  date,
  variant = 'default',
}: SelectMonthProps) {
  const [month, setMonth] = useState<Date>(date || new Date());

  const { replace } = useRouter();
  const pathname = usePathname();

  const addQueryParams = (date: Date) => {
    const params = new URLSearchParams();

    params.set('month', format(date, 'yyyy-MM'));

    replace(`${pathname}?${params}`);
  };

  function onSelectMonth(date: Date) {
    setMonth(date);
    addQueryParams(date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          className={cn(
            'bg w-40 pl-3 text-left font-normal capitalize',
            !month && 'text-muted-foreground'
          )}
        >
          {date_MMMM_yyyy(month)}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <MonthPicker selectedMonth={month} onSelectMonth={onSelectMonth} />
      </PopoverContent>
    </Popover>
  );
}
