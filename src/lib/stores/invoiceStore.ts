import { writable } from 'svelte/store';
import { insertInvoice, loadAllInvoices, loadInvoiceById } from '../../api/invoice';
import type { InvoiceType } from '../../types/DTM';

export const invoices = writable<InvoiceType[]>([]);

export const loadInvoices = async () => {
  const data = await loadAllInvoices();
  if (data) {
    invoices.set(data);
  }
};

export const addInvoice = async (invoice: InvoiceType, userId: string = '7c6166b5-6d09-4545-b8fb-8c606c98a6ea') => {
  await insertInvoice(invoice, userId);
  await loadInvoices();
};

export const updateInvoice = (invoiceToUpdate: InvoiceType) => {
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

export const deleteInvoice = (invoiceToDelete: InvoiceType) => {
  invoices.update((prev) => {
    return prev.filter((invoice) => invoice.id !== invoiceToDelete.id);
  });
  // to use this data after successful delete
  return invoiceToDelete;
};

export const getInvoiceById = async (id: string) => {
  const data = await loadInvoiceById(id);
  if (data) {
    return data;
  }
};
