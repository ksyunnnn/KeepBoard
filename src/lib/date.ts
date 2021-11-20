import { format as fmt } from 'date-fns';

export const format = (
  date: Date | undefined,
  variant?: 'TIME' | 'YMD' | 'MD TIME',
) => {
  if (!date) return '';
  if (variant === 'TIME') return fmt(date, 'h:mm aa');
  if (variant === 'MD TIME') return fmt(date, 'MM月dd日 h:mm aa');
  return fmt(date, 'yyyy年MM月dd日');
};
