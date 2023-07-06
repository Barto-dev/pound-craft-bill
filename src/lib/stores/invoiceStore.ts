import { writable } from 'svelte/store';
import type { Invoice } from '../../global';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data.invoices as Invoice[]);
  // invoices.set([]);
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
  invoices.update((prev) => {
    return prev.filter((invoice) => invoice.id !== invoiceToDelete.id);
  });
  // to use this data after successful delete
  return invoiceToDelete;
};
