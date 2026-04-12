import { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import {
  COLOR_MAP,
  COLOR_NAMES,
  ColorName,
} from '@/constants/colors-constants';

interface ColorPickerProps extends Omit<ComponentProps<'button'>, 'onChange'> {
  value: string;
  onChange: (value: ColorName) => void;
}

export function ColorPicker({ value, onChange, ...props }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {COLOR_NAMES.map((name) => {
        const { bgColor } = COLOR_MAP[name];
        const isSelected = value === name;
        return (
          <Button
            key={name}
            type="button"
            className={`h-9 w-9 cursor-pointer rounded-full transition-all hover:${bgColor} hover:opacity-80 ${bgColor} ${
              isSelected
                ? 'ring-primary ring-offset-background ring-2 ring-offset-2'
                : ''
            }`}
            onClick={() => onChange(name)}
            {...props}
          />
        );
      })}
    </div>
  );
}
