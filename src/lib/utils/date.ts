// Takes a date yyyy-mm-dd and returns d-m-yyyy
import format from 'date-fns/format';
import isBefore from 'date-fns/isBefore';
export const convertDate = (date: string): string => {
  const parsedDate = new Date(date);
  return format(parsedDate, 'd/M/yyyy');
};

// Determines whether a date is before today (meaning it's late!)
export const isLate = (date: string): boolean => {
  const dueDate = new Date(date);
  const today = new Date();
  return isBefore(dueDate, today);
};
