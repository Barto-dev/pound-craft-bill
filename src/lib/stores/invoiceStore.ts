import { writable } from 'svelte/store';
import type { Invoice } from '../../global';
import data from '../../seed.json';

export const invoices = writable<Invoice[]>([]);

export const loadInvoices = () => {
  invoices.set(data.invoices as Invoice[]);
  // invoices.set([]);
};

export const addInvoice = (invoice: Invoice) => {
  invoices.update((prev) => {
    return [...prev, invoice];
  });
  return invoice;
};

export const updateInvoice = (invoiceToUpdate: Invoice) => {
  invoices.update((prev) => {
    return prev.map((invoice) => {
      if (invoice.id === invoiceToUpdate.id) {
        return invoiceToUpdate;
      }
      return invoice;
    });
  });
  return invoiceToUpdate;
};

export const deleteInvoice = (invoiceToDelete: Invoice) => {
  invoices.update((prev) => {
    return prev.filter((invoice) => invoice.id !== invoiceToDelete.id);
  });
  // to use this data after successful delete
  return invoiceToDelete;
};
