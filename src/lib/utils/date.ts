
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';

// Takes a date yyyy-mm-dd and returns d-m-yyyy
export const convertDate = (date: Date | string): string => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'd/M/yyyy');
};
export const today = format(new Date(), 'yyyy-MM-dd');

// Determines whether a date is before today (meaning it's late!)
export const isLate = (date: string): boolean => {
  const dueDate = new Date(date);
  const today = new Date();
  return isBefore(dueDate, today);
};
