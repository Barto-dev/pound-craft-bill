import { isLate } from '$lib/utils/date';

export const getInvoiceLabel = (invoiceStatus: string, dueDate: string) => {
  if (invoiceStatus === 'draft') {
    return 'draft';
  }

  if (invoiceStatus === 'sent' && !isLate(dueDate)) {
    return 'sent';
  }

  if (invoiceStatus === 'sent' && isLate(dueDate)) {
    return 'late';
  }

  if (invoiceStatus === 'paid') {
    return 'paid';
  }
};
